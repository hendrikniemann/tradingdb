/* @flow */
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';

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
  }),
});

export default User;
