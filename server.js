import koa from 'koa';
import connection from './schema/connection';

const app = koa();

app.use(function *helloworld() {
  this.body = 'Hello World';
});

console.log('Checking database connection...');

connection
  .authenticate()
  .then(() => console.log('Connection ok!'))
  .then(() => app.listen(3000))
  .catch(err => console.error(err));
