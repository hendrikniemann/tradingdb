/* @flow */
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
} from 'graphql';
import Item from './Item';
import { isOwner } from '../../models/ItemModel';
import type { AppContext } from '../../app';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createItem: {
      type: Item,
      description: 'Create a new item in the database.',
      args: {
        description: {
          type: new GraphQLNonNull(GraphQLString),
        },
        bought: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve(parent, { description, bought }: { description: string, bought: number }, ctx) {
        return ctx.state.models.items.create({
          description,
          bought,
          boughtOn: new Date(),
          ownerId: ctx.state.userId,
        });
      },
    },
    deleteItem: {
      type: GraphQLBoolean,
      description: 'Create a new item in the database.',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The unique id of the item.',
        },
      },
      async resolve(parent, { id }: { id: string }, ctx: AppContext) {
        const item = ctx.state.models.items.load(id);
        if (!isOwner(ctx.state.userId, item)) {
          return new Error('You don\' have permission to delete this item.');
        }
        return ctx.state.models.items.delete(id);
      },
    },
    sellItem: {
      type: Item,
      description: 'Set the provided item and set the soldAt property to NOW.',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the item that was sold.',
        },
        sold: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'The price that the item was sold for.',
        },
      },
      resolve: (parent: any, { id, sold }: { id: string, sold: number }, ctx: AppContext) =>
        ctx.state.models.items.update(id, {
          sold,
          soldOn: new Date(),
        }),
    },
  },
});

export default Mutation;
