/* @flow */
import { GraphQLID, GraphQLInt, GraphQLNonNull } from 'graphql';

import ItemType from '../types/ItemType';
import { ItemModel } from '../../models';

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
  resolve: (_: any, { id, sold }: { id: string, sold: number }) => ItemModel
    .findById(id)
    .then(i => i.update({ soldOn: new Date(), sold })),
};

export default sellItem;
