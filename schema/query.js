import { GraphQLObjectType } from 'graphql';
import { Multiple as ItemMultiple } from './types/item';

const Query = new GraphQLObjectType({
  name: 'query',
  fields: {
    items: ItemMultiple,
  },
});

export default Query;
