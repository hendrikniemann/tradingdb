import { GraphQLObjectType } from 'graphql';
import {
  create as ItemCreate,
} from './types/item';

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  fields: () => ({
    createItem: ItemCreate,
  }),
});

export default MutationType;
