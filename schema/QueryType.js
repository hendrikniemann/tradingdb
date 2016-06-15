import { GraphQLObjectType } from 'graphql';
import {
  multiple as ItemMultiple,
  single as ItemSingle,
} from './types/item';

import { user } from './types/user';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    item: ItemSingle,
    items: ItemMultiple,
    user,
  },
});

export default QueryType;
