/* @flow */
import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';

import Item from '../types/Item';
import { ItemModel } from '../../models';

const createItem = {
  type: Item,
  description: 'Create a new item in the database.',
  args: {
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    bought: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (_: any, args: { description: string, bought: number }) => ItemModel.create(args),
};

export default createItem;
