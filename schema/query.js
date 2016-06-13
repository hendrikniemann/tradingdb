import { GraphQLObjectType } from 'graphql';
import {
  multiple as ItemMultiple,
  single as ItemSingle,
} from './types/item';

const Query = new GraphQLObjectType({
  name: 'query',
  fields: {
    item: ItemSingle,
    items: ItemMultiple,
  },
});

export default Query;
