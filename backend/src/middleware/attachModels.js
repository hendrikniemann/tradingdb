/* @flow */
import type { Middleware, Context } from 'koa';
import type { Connection } from 'rethinkdb';
import ItemModel from '../models/ItemModel';
import UserModel from '../models/UserModel';

export type ModelMap = {
  items: ItemModel,
  users: UserModel,
};

export default function attachLoaders(connection: Connection): Middleware {
  return function attachLoadersMiddleware(ctx: Context, next) {
    ctx.state.models = {
      items: new ItemModel(connection),
      users: new UserModel(connection),
    };
    return next();
  };
}
