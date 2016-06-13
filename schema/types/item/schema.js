import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

const Item = new GraphQLObjectType({
  name: 'Item',
  description: 'A single item which is on sale or sold.',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'A unique identifier for this item.',
      resolve: item => item.id,
    },
    description: {
      type: GraphQLString,
      description: 'A string that defines the type of the item.',
      resolve: item => item.description,
    },
    bought: {
      type: GraphQLInt,
      description: 'The price at which the item was aquired.',
      resolve: item => item.bought,
    },
  }),
});

export default Item;
