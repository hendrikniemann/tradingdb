import { GraphQLID, GraphQLInt, GraphQLNonNull } from 'graphql';

import ItemType from '../types/ItemType';
import ItemModel from '../models/ItemModel';

const sellItem = {
  type: ItemType,
  description: 'Set the provided item and set the soldAt property to NOW.',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the item that was sold.',
    },
    sold: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The price that the item was sold for.',
    },
  },
  resolve: (_, { id, sold }) => ItemModel
    .findById(id)
    .then(i => i.update({ soldOn: new Date(), sold })),
};

export default sellItem;
