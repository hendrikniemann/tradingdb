import { GraphQLObjectType } from 'graphql';
import {
  Multiple as ItemMultiple,
  Single as ItemSingle,
} from './types/item';

const Query = new GraphQLObjectType({
  name: 'query',
  fields: {
    item: ItemSingle,
    items: ItemMultiple,
  },
});

export default Query;
