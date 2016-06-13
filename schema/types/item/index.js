import { GraphQLList, GraphQLInt } from 'graphql';

import ItemSchema from './schema';
import ItemModel from './model';

export const Multiple = {
  type: new GraphQLList(ItemSchema),
  resolve: () => ItemModel.findAll(),
};

export const Single = {
  type: ItemSchema,
  args: {
    id: {
      type: GraphQLInt,
    },
  },
  resolve: (_, { id }) => ItemModel.findById(id),
};
