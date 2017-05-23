/* @flow */
import Koa from 'koa';
import convert from 'koa-convert';
import graphQLHttp from 'koa-graphql';
import OpticsAgent from 'optics-agent';
import auth from '../../middleware/auth';
import Schema from '../../graphql/Schema';

// GraphQL endpoint provides GraphQL API
const graphQLEndpoint = new Koa();
graphQLEndpoint.use(auth());
// Optics used to instrument graphql requests on optics.apollo.
if (process.env.OPTICS_API_KEY) {
  OpticsAgent.instrumentSchema(Schema);
  graphQLEndpoint.use(OpticsAgent.koaMiddleware());
}
graphQLEndpoint.use(convert(graphQLHttp((request, response, ctx) => ({
  schema: Schema,
  graphiql: process.env.NODE_ENV !== 'production',
  context: Object.assign(ctx, { opticsContext: OpticsAgent.context(ctx.req) }),
}))));


export default graphQLEndpoint;
