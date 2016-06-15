import { GraphQLObjectType } from 'graphql';

import item from '../queries/item';
import items from '../queries/items';
import user from '../queries/user';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    item,
    items,
    user,
  },
});

export default QueryType;
