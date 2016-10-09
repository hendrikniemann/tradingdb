import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import ItemSchema from './ItemType';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user of the system',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'A unique identifier for this user.',
      resolve: user => user.id,
    },
    email: {
      type: GraphQLString,
      description: 'The user\'s email address.',
      resolve: user => user.email,
    },
    items: {
      type: new GraphQLList(ItemSchema),
      description: 'Items the user created.',
      resolve: user => user.getItems(),
    },
  }),
});

export default UserType;
