import koa from 'koa';
import connection from './schema/connection';
import graphqlMiddleware from 'koa-graphql';
import mount from 'koa-mount';

import Schema from './schema';

const app = koa();

app.use(mount('/graphql', graphqlMiddleware({
  schema: Schema,
  graphiql: true,
})));

app.use(function *helloworld() {
  this.body = 'Hello World';
});

console.log('Checking database connection...');

connection
  .authenticate()
  .then(() => console.log('Connection ok!'))
  .then(() => app.listen(3000))
  .catch(err => console.error(err));
