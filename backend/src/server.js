/* @flow */
import { connect } from 'rethinkdb';
import { Logger, transports } from 'winston';
import app from './app';
import config from './config';

const logger = new Logger({
  transports: [
    new transports.Console(({ level: 'silly' })),
  ],
});

connect(config.database)
  .then(connection => app(connection, logger))
  .then((server) => {
    process.on('SIGTERM', async () => {
      const closeServer = () => new Promise((reject, resolve) => server.close((err) => {
        if (err) {
          return reject(err);
        }
        return resolve(err);
      }));

      try {
        await Promise.all([
          closeServer(),
        ]);
        process.exit(0);
      } catch (e) {
        process.exit(1);
      }
    });
  });
