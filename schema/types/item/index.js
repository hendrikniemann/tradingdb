import {
  GraphQLObjectSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';
import ItemModel from './model';

const Item = new GraphQLObjectSchema({
  name: 'item',
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
