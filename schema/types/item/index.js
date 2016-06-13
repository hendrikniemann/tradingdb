import { GraphQLList, GraphQLInt } from 'graphql';

import ItemSchema from './schema';
import ItemModel from './model';

export const multiple = {
  type: new GraphQLList(ItemSchema),
  resolve: () => ItemModel.findAll(),
};

export const single = {
  type: ItemSchema,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The unique id of this item.',
    },
  },
  resolve: (_, { id }) => ItemModel.findById(id),
};
