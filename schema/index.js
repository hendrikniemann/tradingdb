import { GraphQLSchema } from 'graphql/type';
import Query from './query';

const Schema = new GraphQLSchema({
  query: Query,
});

export default Schema;
