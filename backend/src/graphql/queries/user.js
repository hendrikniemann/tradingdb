/* @flow */
import { GraphQLNonNull, GraphQLInt } from 'graphql';
import { resolver } from 'graphql-sequelize';

import UserType from '../types/UserType';
import { UserModel } from '../../models';

const user = {
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the requested user',
    },
  },
  resolve: resolver(UserModel),
};

export default user;
