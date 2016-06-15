import jwt from 'jsonwebtoken';
import config from '../../config/config';

const SECRET = config.secret;
const SIGN_OPTIONS = {
  expiresIn: config.sessionLength,
};

export function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        return reject(err);
      }
      return resolve(payload);
    });
  });
}

export function sign(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, SIGN_OPTIONS, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });
}
