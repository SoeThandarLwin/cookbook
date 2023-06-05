import bcrypt from 'bcrypt';
import multiparty from 'multiparty';

import pool from '../data/database.js';
import { compose, head, propOr } from 'ramda';

const getPropFromFields = (propName) => compose(head, propOr([], propName));
const registerHandler = async (request, response) => {
  const form = new multiparty.Form();
  const salt = await bcrypt.genSalt(10);

  form.parse(request, async (error, fields, files) => {
    const name = getPropFromFields('name')(fields);
    const password = getPropFromFields('password')(fields);
    const email = getPropFromFields('email')(fields);
    const phone = getPropFromFields('phone')(fields);

    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await pool.execute(
        'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
        [name, email, phone, hashedPassword],
      );

      response.status(200).json({
        success: true,
      });
    } catch (error) {
      response.status(400).json({
        success: false,
      });
    }
  });
};

export default registerHandler;
