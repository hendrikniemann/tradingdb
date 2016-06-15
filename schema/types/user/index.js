import { GraphQLNonNull, GraphQLInt } from 'graphql';

import UserModel from './UserModel';
import UserType from './UserType';

export const user = {
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the requested user',
    },
  },
  resolve: (_, { id }) => UserModel.findById(id),
};
