/* @flow */
import { compare } from 'bcrypt';
import promisify from 'es6-promisify';
import jwt from 'jsonwebtoken';

import config from '../config';

const sign = promisify(jwt.sign);

export default async function login(ctx: any) {
  const { email, password } = ctx.request.body;
  ctx.assert(email && password, 400, 'Login needs email and password!');

  const user = await ctx.state.models.users.getByEmail(email);
  ctx.assert(user, 400, 'Wrong login credentials!');

  const passwordOk = await compare(password, user.password);
  ctx.assert(passwordOk, 400, 'Wrong login credentials!');

  const payload = { id: user.id };

  const token = await sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.sessionLength,
  });

  ctx.status = 200;
  ctx.body = { token };
}
