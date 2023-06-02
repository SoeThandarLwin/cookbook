import pool from '../data/database.js';

const listRecipesHandler = async (request, response) => {
  const [rows] = await pool.execute(
    `SELECT recipes.id, recipes.name, recipes.image, recipes.calories, recipes.prep_time, 
            users.id as user_id, users.name as user_name 
        FROM recipes 
        JOIN users 
        ON users.id = recipes.user_id`,
    [],
  );

  const recipes = rows.map((row) => ({
    id: row.id,
    name: row.name,
    image: row.image,
    calories: row.calories,
    prep_time: row.prep_time,
    user: {
      id: row.user_id,
      name: row.user_name,
    },
  }));

  response.status(200).send({ data: recipes });
};

export default listRecipesHandler;
