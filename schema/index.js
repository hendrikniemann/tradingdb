import { GraphQLSchema } from 'graphql/type';
import Query from './query';
import Mutation from './mutation';

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default Schema;
