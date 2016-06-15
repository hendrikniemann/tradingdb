import { GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';

import ItemType from './ItemType';
import ItemModel from './ItemModel';

export const item = {
  type: ItemType,
  description: 'Select a single item by its id.',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The unique id of this item.',
    },
  },
  resolve: (_, { id }) => ItemModel.findById(id),
};

export const items = {
  type: new GraphQLList(ItemType),
  description: 'Select all items from the database.',
  resolve: () => ItemModel.findAll(),
};

export const createItem = {
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

export const sellItem = {
  type: ItemType,
  description: 'Set the provided item and set the soldAt property to NOW.',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (_, { id }) => ItemModel
    .findById(id)
    .then(itm => itm.update({ soldOn: new Date() })),
};
