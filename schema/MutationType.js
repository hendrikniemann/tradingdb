import { GraphQLObjectType } from 'graphql';
import { createItem, sellItem } from './types/item';

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  fields: () => ({
    createItem,
    sellItem,
  }),
});

export default MutationType;
