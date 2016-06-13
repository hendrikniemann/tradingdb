import { GraphQLObjectType } from 'graphql';
import { Multiple as ItemMultiple } from './types/item';

const Query = new GraphQLObjectType({
  name: 'query',
  fields: {
    item: ItemMultiple,
  },
});

export default Query;
