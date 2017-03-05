/* @flow */
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

export type ItemInputType = {
  description: string,
  bought: number,
}

const ItemInput: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'ItemInput',
  fields: {
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'A description for this item.',
    },
    bought: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The amount this item was bought for.',
    },
  },
});

export default ItemInput;
