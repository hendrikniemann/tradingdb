import { GraphQLObjectType } from 'graphql';
import {
  create as ItemCreate,
  sell as ItemSell,
} from './types/item';

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  fields: () => ({
    createItem: ItemCreate,
    sellItem: ItemSell,
  }),
});

export default MutationType;
