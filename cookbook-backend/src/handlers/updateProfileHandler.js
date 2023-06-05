import jsonwebtoken from 'jsonwebtoken';
import multiparty from 'multiparty';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

import pool from '../data/database.js';
import {
  getTokenFromCookie,
  getUserId,
  isValidUser,
  verifyToken,
} from '../utils/auth.js';
import { compose, head, isEmpty, not, prop } from 'ramda';

export function moveFile(from, to) {
  const source = fs.createReadStream(from);
  const dest = fs.createWriteStream(to);

  return new Promise((resolve, reject) => {
    source.on('end', resolve);
    source.on('error', reject);
    source.pipe(dest);
  });
}

const UpdateProfileHandler = async (request, response) => {
  const cookie = request.cookies;
  const { name, phone } = request.body;

  const getData = compose(JSON.parse, head, prop('data'));

  const getName = compose(head, prop('name'));

  const getPhone = compose(head, prop('phone'));

  const getFile = compose(head, prop('file'));

  const isValid = isValidUser(cookie);

  const hasAttachment = compose(not, isEmpty());

  if (!isValid) {
    response.status(401).send();
  }

  const token = getTokenFromCookie(cookie);
  const decoded = jsonwebtoken.decode(token, { complete: true });
  const userId = getUserId(decoded);

  const form = new multiparty.Form();
  form.parse(request, async (err, fields, files) => {
    try {
      const name = getName(fields);
      const phone = getPhone(fields);
      let file;

      if (hasAttachment(files)) {
        file = getFile(files);
        const ext = file.originalFilename.split('.').pop();
        const hashedFileName = `${uuidv4()}.${ext}`;
        await moveFile(file.path, `./public/images/${hashedFileName}`);

        const [result] = await pool.execute(
          'UPDATE users SET name = ?, phone = ?, avatar = ? WHERE id = ?',
          [name, phone, hashedFileName, userId],
        );
      } else {
        const [result] = await pool.execute(
          'UPDATE users SET name = ?, phone = ? WHERE id = ?',
          [name, phone, userId],
        );
      }

      response.status(200).send();
    } catch (e) {
      console.error(e);
      response.status(400).send();
    }
  });
};

export default UpdateProfileHandler;
