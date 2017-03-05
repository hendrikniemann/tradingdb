/* @flow */
import { GraphQLList } from 'graphql';

import Item from '../types/Item';
import { ItemModel } from '../../models';

const items = {
  type: new GraphQLList(Item),
  description: 'Select all items from the database.',
  resolve: () => ItemModel.findAll(),
};

export default items;
