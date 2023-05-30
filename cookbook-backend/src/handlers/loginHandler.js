import { compose, head } from 'ramda';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import pool from '../data/database.js';

const getUser = compose(head);

const loginHandler = async (request, response) => {
  const { email, password } = request.body;

  try {
    const [rows, fields] = await pool.execute(
      'SELECT * FROM users WHERE email LIKE ? LIMIT 1',
      [email],
    );

    const user = getUser(rows);

    bcrypt.compare(password, user.password, async (error, result) => {
      if (!!error) {
        response.sendStatus(401);
        return;
      } else {
        if (!result) {
          response.sendStatus(401);
          return;
        }

        delete user.password;
        const token = await jsonwebtoken.sign(
          user,
          'c+27R5AKGiZrm4wdjSisbL4uTJtt9p2BdT8nJzXNIcXRg1tr0lSd1pSVmZHufbdpHEra3Y3z3pJvfzknH5OfEQ==',
        );
        response
          .cookie('jwt', token, { httpOnly: true, sameSite: 'lax' })
          .send();
        return;
      }
    });
  } catch (error) {}
};

export default loginHandler;
