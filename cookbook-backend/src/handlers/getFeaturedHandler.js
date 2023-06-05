import pool from '../data/database.js';

const getFeaturedHandler = async (request, response) => {
  const [recipes] = await pool.execute(
    'SELECT recipes.id, recipes.name, recipes.image, recipes.calories, recipes.prep_time, users.id as user_id, users.name as user_name FROM recipes JOIN users ON users.id = recipes.user_id WHERE recipes.featured = 1',
  );

  // const transformedRecipes = recipes.map(transformRecipe);

  response.status(200).send(recipes);
};

export default getFeaturedHandler;
