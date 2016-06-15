import koa from 'koa';
import graphqlMiddleware from 'koa-graphql';
import mount from 'koa-mount';

import './schema/types/associations';
import Schema from './schema';

const app = koa();

app.use(mount('/graphql', graphqlMiddleware({
  schema: Schema,
  graphiql: true,
})));

app.listen(3000);
