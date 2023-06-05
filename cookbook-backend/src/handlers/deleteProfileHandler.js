import { getTokenFromCookie, getUserId, verifyToken } from '../utils/auth.js';
import jsonwebtoken from 'jsonwebtoken';
import pool from '../data/database.js';

import { compose, head, isEmpty, prop, propOr } from 'ramda';

const getData = compose(JSON.parse, head, prop('data'));

const getImage = compose(head, prop('image'));

const getRecipe = prop('recipe');

const getIngredients = propOr([], 'ingredients');

const getNutritions = propOr([], 'nutritions');

const getSteps = propOr([], 'steps');

const isInvalid = isEmpty;

const getInsertedId = compose(prop('insertId'), head);

const deleteRecipeHandler = async (request, response) => {
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

  const result = await pool.execute('DELETE FROM users WHERE id = ?', [userId]);

  response.status(200).send();
};

export default deleteRecipeHandler;
