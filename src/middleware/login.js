import bcrypt from 'bcrypt';
import promisify from 'es6-promisify';
import jwt from 'jsonwebtoken';
import addSeconds from 'date-fns/add_seconds';

import config from '../config/config.json';
import { UserModel } from '../models';

const compare = promisify(bcrypt.compare);
const sign = promisify(jwt.sign);

export default function* login() {
  const { email, password } = this.request.body;
  this.assert(email && password, 400, 'Login needs email and password!');

  const user = yield UserModel.findOne({ email });
  this.assert(user, 400, 'Wrong login credentials!');

  const passwordOk = yield compare(password, user.password);
  this.assert(passwordOk, 400, 'Wrong login credentials!');

  const token = yield sign({ user }, config.secret, {
    expiresIn: config.sessionLength,
  });

  this.cookies.set('jwt', token, {
    httpOnly: false,
    expires: addSeconds(new Date(), config.sessionLength),
  });

  this.status = 200;
}
