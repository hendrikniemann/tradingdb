import { GraphQLObjectType } from 'graphql';
import {
  multiple as ItemMultiple,
  single as ItemSingle,
} from './types/item';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    item: ItemSingle,
    items: ItemMultiple,
  },
});

export default QueryType;
