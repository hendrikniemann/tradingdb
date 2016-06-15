import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';

import ItemType from '../types/ItemType';
import ItemModel from '../models/ItemModel';

const createItem = {
  type: ItemType,
  description: 'Create a new item in the database.',
  args: {
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    bought: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (_, args) => ItemModel.create(args),
};

export default createItem;
