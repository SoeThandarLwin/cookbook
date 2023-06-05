import pool from '../data/database.js';

const searchHandler = async (request, response) => {
  const query = request.query.query;

  const [rows] = await pool.execute(
    `SELECT recipes.id, recipes.name, recipes.image, recipes.calories, recipes.prep_time, 
            users.id as user_id, users.name as user_name, users.avatar as user_avatar 
        FROM recipes 
        JOIN users 
        ON users.id = recipes.user_id
        WHERE LOWER(recipes.name) LIKE ?`,
    [`%${query}%`],
  );

  response.json(rows);
};

export default searchHandler;
