import jsonwebtoken from 'jsonwebtoken';
import multiparty from 'multiparty';
import { compose, head, isEmpty, not, prop, propOr } from 'ramda';
import { getTokenFromCookie, getUserId, verifyToken } from '../utils/auth.js';
import pool from '../data/database.js';
import { v4 as uuidv4 } from 'uuid';
import { moveFile } from './updateProfileHandler.js';

const getData = compose(JSON.parse, head, prop('data'));

const getImage = compose(head, prop('image'));

const getRecipe = prop('recipe');

const getIngredients = propOr([], 'ingredients');

const getNutritions = propOr([], 'nutritions');

const getSteps = propOr([], 'steps');

const isInvalid = isEmpty;

const getInsertedId = compose(prop('insertId'), head);

const createRecipeHandler = async (request, response) => {
  const cookie = request.cookies;

  if (isInvalid(cookie)) {
    response.status(401).send();
    return;
  }

  const token = getTokenFromCookie(cookie);

  if (isInvalid(token)) {
    response.status(401).send();
    return;
  }

  const isVerified = await verifyToken(token);

  if (!isVerified) {
    response.status(401).send();
    return;
  }

  const decoded = jsonwebtoken.decode(token, { complete: true });

  const userId = getUserId(decoded);

  const hasAttachment = compose(not, isEmpty());

  const getFile = compose(head, prop('file'));

  const form = new multiparty.Form();
  form.parse(request, async (err, fields, files) => {
    try {
      const data = getData(fields);
      const recipe = getRecipe(data);
      const ingredients = getIngredients(recipe);
      const nutritions = getNutritions(recipe);
      const steps = getSteps(recipe);
      let file;
      let recipeResponse;

      const con = await pool.getConnection();
      await con.beginTransaction();

      if (hasAttachment(files)) {
        file = getFile(files);
        const ext = file.originalFilename.split('.').pop();
        const hashedFileName = `${uuidv4()}.${ext}`;
        await moveFile(file.path, `./public/images/${hashedFileName}`);

        recipeResponse = await con.execute(
          'INSERT INTO recipes (name, calories, prep_time, image, user_id) VALUES (?, ?, ?, ?, ?)',
          [
            recipe.name,
            recipe.calories,
            recipe.prep_time,
            hashedFileName,
            userId,
          ],
        );
      } else {
        recipeResponse = await con.execute(
          'INSERT INTO recipes (name, calories, prep_time, user_id) VALUES (?, ?, ?, ?)',
          [recipe.name, recipe.calories, recipe.prep_time, userId],
        );
      }

      const recipeId = getInsertedId(recipeResponse);

      ingredients.map(async (ingredient) => {
        await con.execute(
          'INSERT INTO ingredients (name, amount, unit, recipe_id) VALUES (?, ?, ?, ?)',
          [ingredient.name, ingredient.amount, ingredient.unit, recipeId],
        );
      });

      nutritions.map(async (nutrition) => {
        await con.execute(
          'INSERT INTO nutrition (name, amount, unit, recipe_id) VALUES (?, ?, ?, ?)',
          [nutrition.name, nutrition.amount, nutrition.unit, recipeId],
        );
      });

      steps.map(async (step) => {
        await con.execute(
          'INSERT INTO steps (step_number, content, recipe_id) VALUES (?, ?, ?)',
          [step.step_number, step.content, recipeId],
        );
      });

      await con.commit();
      await con.release();

      response.status(200).send();
      return;
    } catch (e) {
      console.log(e);
      response.status(400).send({
        success: false,
        message: 'Malformed or missing data in request',
      });
      return;
    }
  });
};

export default createRecipeHandler;
