/* @flow */
import Koa from 'koa';
import convert from 'koa-convert';
import graphQLHttp from 'koa-graphql';
import auth from '../../middleware/auth';
import Schema from '../../graphql/Schema';

// GraphQL endpoint provides GraphQL API
const graphQLEndpoint = new Koa();
graphQLEndpoint.use(auth());
graphQLEndpoint.use(convert(graphQLHttp({
  schema: Schema,
  graphiql: process.env.NODE_ENV !== 'production',
})));

export default graphQLEndpoint;
