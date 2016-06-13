import { GraphQLList } from 'graphql';

import ItemSchema from './schema';
import ItemModel from './model';

export const Multiple = {
  type: new GraphQLList(ItemSchema),
  resolve: () => ItemModel.findAll(),
};
