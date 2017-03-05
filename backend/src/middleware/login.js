/* @flow */
import bcrypt from 'bcrypt';
import promisify from 'es6-promisify';
import jwt from 'jsonwebtoken';
import addSeconds from 'date-fns/add_seconds';

import config from '../config/config.json';
import { UserModel } from '../models';

const compare = promisify(bcrypt.compare);
const sign = promisify(jwt.sign);

export default async function login() {
  const { email, password } = this.request.body;
  this.assert(email && password, 400, 'Login needs email and password!');

  const user = await UserModel.findOne({ email });
  this.assert(user, 400, 'Wrong login credentials!');

  const passwordOk = await compare(password, user.password);
  this.assert(passwordOk, 400, 'Wrong login credentials!');

  const payload = {
    user: { id: user.id, email: user.email },
  };
  const token = await sign(payload, config.secret, {
    expiresIn: config.sessionLength,
  });

  this.cookies.set('jwt', token, {
    httpOnly: false,
    expires: addSeconds(new Date(), config.sessionLength),
  });

  this.status = 200;
}
