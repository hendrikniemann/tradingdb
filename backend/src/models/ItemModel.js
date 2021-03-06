/* @flow */
import { table, type Connection } from 'rethinkdb';
import Model, { type WithID } from './Model';

export type ItemModelType = {|
  description: string,
  boughtOn: string,
  soldOn: ?string,
  bought: number,
  sold: ?number,
  ownerId: ?string,
|}

export function isOwner(ownerId: string, item: { ownerId: string } | Error) {
  if (item instanceof Error) {
    return true;
  }
  return item.ownerId === ownerId;
}

export default class ItemModel extends Model<ItemModelType> {
  constructor(connection: Connection) {
    super(connection, 'item');
  }

  async getByOwner(id: string): Promise<Array<ItemModel & WithID>> {
    const result = await table('item').getAll(id, { index: 'ownerId' }).run(this.connection);
    return result.toArray();
  }
}
