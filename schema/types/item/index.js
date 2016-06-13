import { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';

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

export const create = {
  type: ItemSchema,
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
