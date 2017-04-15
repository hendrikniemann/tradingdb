/* @flow */
import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import Item from './Item';

const Query = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    item: {
      type: Item,
      description: 'Select a single item by its id.',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The unique id of this item.',
        },
      },
      resolve: (parent, { id }: { id: number }, ctx) => ctx.state.loaders.items.load(id),
    },
    items: {
      type: new GraphQLList(Item),
      description: 'Select all items from the database.',
      resolve: (parent, args, ctx) => ctx.state.models.items.getByOwner(ctx.state.userId),
    },
  },
});

export default Query;
