/* @flow */
import winston, { Logger } from 'winston';

export default () => {
  const loggerInstance = new Logger({
    level: 'debug',
    transports: [
      new winston.transports.Console(),
    ],
  });

  return async function provideLoggerInstance(ctx: any, next: () => Promise<any>) {
    ctx.state.logger = loggerInstance;
    await next();
  };
};
