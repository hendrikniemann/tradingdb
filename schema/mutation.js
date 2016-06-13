import { GraphQLObjectType } from 'graphql';
import {
  create as ItemCreate,
} from './types/item';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createItem: ItemCreate,
  }),
});

export default Mutation;
