/* @flow */
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import { resolver } from 'graphql-sequelize';

import Item from './Item';
import { UserModel } from '../../models';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'A user of the system',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'A unique identifier for this user.',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The user\'s email address.',
    },
    items: {
      type: new GraphQLList(Item),
      description: 'Items the user created.',
      resolve: resolver(UserModel.ItemModels),
    },
  }),
});

export default User;
