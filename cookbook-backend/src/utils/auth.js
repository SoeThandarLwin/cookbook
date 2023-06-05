import { compose, isEmpty, path, propOr } from 'ramda';
import jsonwebtoken from 'jsonwebtoken';

export const getUserId = compose(path(['payload', 'id']));

export const getTokenFromCookie = propOr('', 'jwt');

export const verifyToken = async (token) =>
  await jsonwebtoken.verify(
    token,
    'c+27R5AKGiZrm4wdjSisbL4uTJtt9p2BdT8nJzXNIcXRg1tr0lSd1pSVmZHufbdpHEra3Y3z3pJvfzknH5OfEQ==',
  );

const isInvalid = isEmpty;

export const isValidUser = async (cookie) => {
  if (isInvalid(cookie)) return false;

  const token = getTokenFromCookie(cookie);

  if (isInvalid(token)) return false;

  const isVerified = await verifyToken(token);

  if (!isVerified) return false;
};
