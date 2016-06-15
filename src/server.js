import koa from 'koa';
import graphqlMiddleware from 'koa-graphql';
import mount from 'koa-mount';
import bodyParser from 'koa-bodyparser';

import Schema from './types/Schema';

const app = koa();

app.use(bodyParser());

app.use(mount('/graphql', graphqlMiddleware((_, context) => ({
  schema: Schema,
  graphiql: true,
  context,
}))));

app.listen(3000);
