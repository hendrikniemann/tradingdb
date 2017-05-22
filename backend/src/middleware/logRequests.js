/* @flow */
import type { Logger, LogLevel } from 'winston';
import type { Middleware } from 'koa';

type LoggerOptions = { level?: LogLevel };

const hrtimeToMilli = ([seconds, nanoseconds]: [number, number]) =>
  Math.floor((seconds * 1000) + (nanoseconds / 1e6));

export default function logRequests(
  logger: Logger,
  options?: LoggerOptions = {},
): Middleware {
  return async function logRequestsMiddleware(ctx, next) {
    const level = options.level || 'debug';
    const start = process.hrtime();
    logger.log(level, `[middleware/logRequest]: -> ${ctx.method} ${ctx.path}`);
    ctx.state.logger = logger;
    await next();
    const responseTime = hrtimeToMilli(process.hrtime(start));
    logger.log(
      level,
      `[middleware/logRequest]: <- ${ctx.method} ${ctx.path} within ${responseTime} ms with status ${ctx.status}`,
    );
  };
}
