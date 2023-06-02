import pool from '../data/database.js';
import { getTokenFromCookie, getUserId, verifyToken } from '../utils/auth.js';
import jsonwebtoken from 'jsonwebtoken';
import { head, isEmpty } from 'ramda';

const isInvalid = isEmpty;

const getProfile = head;
const getProfileHandler = async (request, response) => {
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

  const [result] = await pool.execute(
    'SELECT id, name, email, phone, avatar, is_admin FROM users WHERE id = ?',
    [userId],
  );

  const profile = getProfile(result);

  response.json(profile);
};

export default getProfileHandler;
