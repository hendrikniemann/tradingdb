/* @flow */
import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import { resolver } from 'graphql-sequelize';

import ItemSchema from './ItemType';
import { UserModel } from '../models';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user of the system',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'A unique identifier for this user.',
    },
    email: {
      type: GraphQLString,
      description: 'The user\'s email address.',
    },
    items: {
      type: new GraphQLList(ItemSchema),
      description: 'Items the user created.',
      resolve: resolver(UserModel.ItemModels),
    },
  }),
});

export default UserType;
