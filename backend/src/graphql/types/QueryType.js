/* @flow */
import { GraphQLObjectType } from 'graphql';

import * as queries from '../queries';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: queries,
});

export default QueryType;
