import { verify } from './util/jwtutils';

export default function *auth(next) {
  const token = this.cookies.get('jwt');
  try {
    this.state.user = yield verify(token).then(payload => payload.user);
  } catch (error) {
    this.state.user = null;
  }

  console.log(this.state.user);

  yield next;
}
