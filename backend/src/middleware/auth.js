/* @flow */
import { verify } from './util/jwtutils';

export default async function auth(ctx: any, next: () => Promise<any>) {
  const token = ctx.cookies.get('jwt');
  try {
    ctx.state.user = await verify(token).then(payload => payload.user);
  } catch (error) {
    ctx.state.logger.debug('[middleware/auth]: User login attempt with invalid token');
    if (process.env.NODE_ENV === 'development') {
      ctx.state.logger.debug('[middleware/auth]: Setting default user id 1 for this session');
      ctx.state.user = 1;
    } else {
      ctx.throw(401, { message: 'The provided JWT is not valid.' });
    }
  }
  await next();
}
