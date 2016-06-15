import { GraphQLObjectType } from 'graphql';

import { item, items } from './types/item';
import { user } from './types/user';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    item,
    items,
    user,
  },
});

export default QueryType;
