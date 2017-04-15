/* @flow */
import http, { type Server } from 'http';
import type { Connection } from 'rethinkdb';
import { Logger } from 'winston';
import Koa from 'koa';
import mount from 'koa-mount';

import attachModels from '../middleware/attachModels';
import logRequests from '../middleware/logRequests';
import graphQLEndpoint from './endpoints/graphql';
import loginEndpoint from './endpoints/login';

export type ServerOptions = {
  port?: number,
  host?: string,
};

export default async function createApp(
  connection: Connection,
  logger: Logger,
  options?: ServerOptions = {},
): Promise<Server> {
  const app = new Koa();
  const port = options.port || 4000;
  const host = options.host || 'localhost';

  app.use(logRequests(logger));
  app.use(attachModels(connection));
  app.use(mount('/graphql', graphQLEndpoint));
  app.use(mount('/api/login', loginEndpoint));

  return new Promise((resolve, reject) => {
    const server = http.createServer(app.callback()).listen(port, host, 511, (err) => {
      if (err) {
        reject(err);
      }
      resolve(server);
    });
  });
}
