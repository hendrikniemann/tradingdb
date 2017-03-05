/* @flow */
import { verify } from './util/jwtutils';

export default async function auth(ctx: any) {
  const token = ctx.cookies.get('jwt');
  try {
    ctx.state.user = await verify(token).then(payload => payload.user);
  } catch (error) {
    ctx.state.user = null;
  }
}
