/* @flow */
import { GraphQLNonNull, GraphQLInt } from 'graphql';
import { resolver } from 'graphql-sequelize';

import User from '../types/User';
import { UserModel } from '../../models';

const user = {
  type: User,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the requested user',
    },
  },
  resolve: resolver(UserModel),
};

export default user;
