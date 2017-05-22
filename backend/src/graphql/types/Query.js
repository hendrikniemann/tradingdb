/* @flow */
import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import Item from './Item';
import { isOwner } from '../../models/ItemModel';
import type { AppContext } from '../../app';

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
      async resolve(parent, { id }: { id: number }, ctx: AppContext) {
        const item = await ctx.state.models.items.load(id);
        if (!isOwner(ctx.state.userId, item)) {
          return Error('You don\'t have permission to see this item.');
        }
        return item;
      },
    },
    items: {
      type: new GraphQLList(Item),
      description: 'Select all items from the database.',
      resolve: (parent, args, ctx: AppContext) =>
        ctx.state.models.items.getByOwner(ctx.state.userId),
    },
  },
});

export default Query;
