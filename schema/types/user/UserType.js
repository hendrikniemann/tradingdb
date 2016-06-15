import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import ItemSchema from '../item/ItemType';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user of the system',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: user => user.id,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    items: {
      type: new GraphQLList(ItemSchema),
      resolve: user => user.getItems(),
    },
  }),
});

export default UserType;
