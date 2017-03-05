/* @flow */
import { GraphQLObjectType } from 'graphql';

import * as queries from '../queries';

const Query = new GraphQLObjectType({
  name: 'QueryType',
  fields: queries,
});

export default Query;
