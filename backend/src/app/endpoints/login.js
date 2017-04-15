/* @flow */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import login from '../../middleware/login';

// Login endpoint provides RESTlike login API
const loginEndpoint = new Koa();
loginEndpoint.use(bodyParser());
loginEndpoint.use(login);

export default loginEndpoint;
