import { getTokenFromCookie, getUserId, verifyToken } from '../utils/auth.js';
import jsonwebtoken from 'jsonwebtoken';
import { compose, head, isEmpty, prop, propOr } from 'ramda';

import pool from '../data/database.js';

const getData = compose(JSON.parse, head, prop('data'));

const getImage = compose(head, prop('image'));

const getRecipe = prop('recipe');

const getIngredients = propOr([], 'ingredients');

const getNutritions = propOr([], 'nutritions');

const getSteps = propOr([], 'steps');

const isInvalid = isEmpty;

const getInsertedId = compose(prop('insertId'), head);

const myRecipesHandler = async (request, response) => {
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

  const [recipes] = await pool.execute(
    'SELECT * FROM recipes WHERE user_id = ?',
    [userId],
  );

  response.status(200).json(recipes);
};

export default myRecipesHandler;
