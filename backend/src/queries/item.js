import { GraphQLInt, GraphQLNonNull } from 'graphql';
import { resolver } from 'graphql-sequelize';

import ItemType from '../types/ItemType';
import { ItemModel } from '../models';

const item = {
  type: ItemType,
  description: 'Select a single item by its id.',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The unique id of this item.',
    },
  },
  resolve: resolver(ItemModel),
};

export default item;
