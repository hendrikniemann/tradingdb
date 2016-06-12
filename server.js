const koa = require('koa');

const app = koa();

app.use(function *helloworld() {
  this.body = 'Hello World';
});

app.listen(3000);
