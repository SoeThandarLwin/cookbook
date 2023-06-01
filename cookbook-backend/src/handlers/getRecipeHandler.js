import { applySpec, chain, compose, head, mergeLeft, omit, prop } from 'ramda';

import pool from '../data/database.js';

const addUserObject = chain(
  mergeLeft,
  applySpec({
    user: {
      id: prop('user_id'),
      name: prop('user_name'),
    },
  }),
);

const removeUserProps = omit(['user_id', 'user_name']);

const transformRecipe = compose(removeUserProps, addUserObject, head);

const getRecipesHandler = async (request, response) => {
  const recipeId = request.params.id;

  const [recipes] = await pool.execute(
    'SELECT recipes.id, recipes.name, recipes.image, users.id as user_id, users.name as user_name FROM recipes JOIN users ON users.id = recipes.user_id WHERE recipes.id = ?',
    [recipeId],
  );

  if (recipes.length === 0) {
    response.sendStatus(404);
    return;
  }

  const recipe = transformRecipe(recipes);

  const [ingredients] = await pool.execute(
    'SELECT id, name, amount, unit FROM ingredients WHERE recipe_id = ?',
    [recipeId],
  );

  const [steps] = await pool.execute(
    'SELECT id, step_number, content FROM steps WHERE recipe_id = ?',
    [recipeId],
  );

  const [nutritions] = await pool.execute(
    'SELECT id, name, amount, unit FROM nutrition WHERE recipe_id = ?',
    [recipeId],
  );

  response.status(200).send({
    ...recipe,
    ingredients,
    steps,
    nutritions,
  });
};

export default getRecipesHandler;
