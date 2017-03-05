/* @flow */
import { GraphQLSchema } from 'graphql/type';
import QueryType from './types/QueryType';
import MutationType from './types/MutationType';

const Schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export default Schema;
