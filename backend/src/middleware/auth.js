/* @flow */
import jwt from 'jsonwebtoken';
import promisify from 'es6-promisify';
import config from '../config';

const verify = promisify(jwt.verify);

export default () => async function auth(ctx: any, next: () => Promise<any>) {
  const token = ctx.cookies.get('jwt');
  try {
    ctx.state.userId = await verify(token, config.jwt.secret).then(payload => payload.id);
  } catch (error) {
    ctx.state.logger.debug('[middleware/auth]: User login attempt with invalid token');
    if (process.env.NODE_ENV === 'development') {
      ctx.state.logger.debug('[middleware/auth]: Setting default user id 1 for this session');
      ctx.state.userId = 'b18baa71-a6be-45f4-b6d6-b029bd9a8e05';
    } else {
      ctx.throw(401, { message: 'The provided JWT is not valid.' });
    }
  }
  await next();
};
