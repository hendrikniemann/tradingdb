/* @flow */
import { table, type Connection } from 'rethinkdb';
import Dataloader from 'dataloader';

export interface WithID {
  id: string,
}

export default class Model<T: Object> {
  loader: Dataloader<string, T & WithID>
  creator: Dataloader<T, T & WithID>
  connection: Connection
  tableName: string

  constructor(connection: Connection, tableName: string) {
    this.connection = connection;
    this.tableName = tableName;

    type TWithID = T & WithID;
    this.loader = new Dataloader(async (keys: string[]): Promise<Array<TWithID | Error>> => {
      const cursor = await table(tableName).getAll(...keys).run(connection);
      const documents = await cursor.toArray();

      return keys.map((id) => {
        const match = documents.find(document => document.id === id);
        if (match) {
          return match;
        }
        return new Error(`Could not find ${tableName} with id ${id}`);
      });
    });
    this.creator = new Dataloader((seeds: T[]): Promise<Array<TWithID | Error>> =>
      table(tableName)
        .insert(seeds, { returnChanges: true }).run(connection)
        .then(result => result.changes.map(change => change.new_val))
        .catch(error => error),
    );
  }

  load(id: string): Promise<T & WithID> {
    return this.loader.load(id);
  }

  loadMany(ids: string[]): Promise<Array<T & WithID>> {
    return this.loader.loadMany(ids);
  }

  create(seed: T): Promise<T & WithID> {
    return this.creator.load(seed);
  }

  delete(id: string): Promise<boolean> {
    return table(this.tableName).get(id).delete().run(this.connection)
      .then(result => !!result.deleted);
  }

  update(id: string, value: $Shape<T>): Promise<T & WithID> {
    const query = table(this.tableName).get(id).update(value, { returnChanges: true });

    return query.run(this.connection).then(res => res.changes[0].new_val);
  }
}
