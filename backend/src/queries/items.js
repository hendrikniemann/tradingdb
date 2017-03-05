/* @flow */
import { GraphQLList } from 'graphql';

import ItemType from '../types/ItemType';
import { ItemModel } from '../models';

const items = {
  type: new GraphQLList(ItemType),
  description: 'Select all items from the database.',
  resolve: () => ItemModel.findAll(),
};

export default items;
