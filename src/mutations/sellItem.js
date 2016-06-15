import { GraphQLInt, GraphQLNonNull } from 'graphql';

import ItemType from '../types/ItemType';
import ItemModel from '../models/ItemModel';

const sellItem = {
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

export default sellItem;
