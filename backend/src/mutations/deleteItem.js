import { GraphQLID, GraphQLNonNull, GraphQLBoolean } from 'graphql';

import ItemModel from '../models/ItemModel';

const deleteItem = {
  type: GraphQLBoolean,
  description: 'Create a new item in the database.',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The unique id of the item.',
    },
  },
  resolve: (_, { id }) => ItemModel.destroy({ where: { id } }),
};

export default deleteItem;
