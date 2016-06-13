import {
  GraphQLObjectSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

const Item = new GraphQLObjectSchema({
  name: 'Item',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: item => item.id,
    },
    description: {
      type: GraphQLString,
      resolve: item => item.description,
    },
    bought: {
      type: GraphQLInt,
      resolve: item => item.bought,
    },
  }),
});

export default Item;
