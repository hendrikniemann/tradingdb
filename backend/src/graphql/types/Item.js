/* @flow */
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import GraphQLDate from '../scalars/Date';

const Item = new GraphQLObjectType({
  name: 'Item',
  description: 'A single item which is on sale or sold.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'A unique identifier for this item.',
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'A string that defines the type of the item.',
    },
    bought: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The price at which the item was acquired.',
    },
    sold: {
      type: GraphQLInt,
      description: 'The price at which the item was sold.',
    },
    boughtOn: {
      type: new GraphQLNonNull(GraphQLDate),
      description: 'Date of the acquisition of the item.',
    },
    soldOn: {
      type: GraphQLDate,
      description: 'Date on which the item was sold.',
    },
  }),
});

export default Item;
