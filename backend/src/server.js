/* @flow */
import Koa from 'koa';
import graphQLHttp from 'koa-graphql';
import mount from 'koa-mount';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import Schema from './graphql/Schema';
import provideLoggerInstance from './middleware/provideLoggerInstance';
import logErrors from './middleware/logErrors';
import loginMiddleware from './middleware/login';
import authMiddleware from './middleware/auth';

const app = new Koa();

app.use(provideLoggerInstance());
app.use(logErrors());
app.use(logger());

// Login endpoint provides RESTlike login API
const loginEndpoint = new Koa();
loginEndpoint.use(convert(bodyParser()));
loginEndpoint.use(loginMiddleware);
app.use(mount('/login', loginEndpoint));

// GraphQL endpoint provides GraphQL API
const graphQLEndpoint = new Koa();
graphQLEndpoint.use(authMiddleware);
graphQLEndpoint.use(convert(graphQLHttp({
  schema: Schema,
  graphiql: process.env.NODE_ENV !== 'production',
})));
app.use(mount('/graphql', graphQLEndpoint));


app.use(async (ctx) => {
  ctx.redirect('/graphql');
});

app.listen(4000);
