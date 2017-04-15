/* @flow */
import type { Context } from 'koa';
import jwt from 'jsonwebtoken';
import promisify from 'es6-promisify';
import config from '../config';

const verify = promisify(jwt.verify);

export default () => async function auth(ctx: Context, next: () => Promise<any>) {
  try {
    const authHeader = ctx.headers.authorization;
    if (!authHeader || authHeader.substr(0, 6).toLowerCase() !== 'bearer') {
      throw new Error('No token provided');
    }
    const token = authHeader.substr(7);
    ctx.state.userId = (await verify(token, config.jwt.secret)).id;
  } catch (error) {
    ctx.state.logger.debug('[middleware/auth]: User login attempt with invalid token');
    if (process.env.NODE_ENV === 'development') {
      ctx.state.logger.debug('[middleware/auth]: Setting default user id for this session');
      ctx.state.userId = 'b18baa71-a6be-45f4-b6d6-b029bd9a8e05';
    } else {
      ctx.throw(401, 'No JWT provided or provided JWT is invalid.');
    }
  }
  await next();
};
