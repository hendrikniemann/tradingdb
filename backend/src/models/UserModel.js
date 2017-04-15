/* @flow */
import { table, type Connection } from 'rethinkdb';
import Model, { type WithID } from './Model';

export type UserModelType = {|
  email: string,
  password: string,
|}

export default class UserModel extends Model<UserModelType> {
  constructor(connection: Connection) {
    super(connection, 'user');
  }

  async getByEmail(email: string): Promise<UserModel & WithID> {
    const result = await table('user').getAll(email, { index: 'email' }).run(this.connection);

    return (await result.toArray())[0];
  }
}
