import { GraphQLNonNull, GraphQLInt } from 'graphql';

import UserType from '../types/UserType';
import { UserModel } from '../models';

const user = {
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the requested user',
    },
  },
  resolve: (_, { id }) => UserModel.findById(id),
};

export default user;
