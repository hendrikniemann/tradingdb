/* @flow */
import { connect, type ConnectionOptions, type Connection } from 'rethinkdb';

export default function createDBConnection(config: ConnectionOptions): Promise<Connection> {
  return connect(config);
}
