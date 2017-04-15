/* eslint-disable */
declare module 'winston' {
  declare interface Stringifyable {
    toString: () => string,
  }

  declare type MessageFilter = (level: string, msg: string, meta: any) => string;

  declare type MetaRewriter = (level: string, msg: string, meta: any) => any;

  declare type LogLevel = 'silly' | 'debug' | 'verbose' | 'info' | 'warn' | 'error';

  declare type SpecificLogFunction = (msg: string, ...variables: Array<Stringifyable>) => void;

  declare interface Winston {
    log(level: LogLevel, msg: string, ...variables: Array<Stringifyable>): void,
    silly: SpecificLogFunction,
    debug: SpecificLogFunction,
    verbose: SpecificLogFunction,
    info: SpecificLogFunction,
    warn: SpecificLogFunction,
    error: SpecificLogFunction,
    add(logger: WinstonLogger, options: any): void,
    remove(logger: WinstonLogger): void,
  }

  declare interface WinstonLogger {
    constructor(options?: Object): WinstonLogger,
    level?: LogLevel,
    name?: string,
    log(
      level: LogLevel,
      msg: string,
      meta: any,
      callback: (err?: any, result: boolean) => void,
    ): void,
  }

  declare type WinstonOptions = {
    transports?: WinstonLogger[],
  }

  declare type WinstonDefaultLoggers = {
    Console: Class<WinstonLogger>,
    File: Class<WinstonLogger>,
  }

  declare interface Logger extends Winston {
    constructor(options?: WinstonOptions): Logger,
    filters: MessageFilter[],
    rewriters: MetaRewriter[],
  }

  declare interface WinstonExport extends Winston {
    Logger: Class<Logger>,
    LogLevel: LogLevel,
    Winston: Winston,
    transports: WinstonDefaultLoggers,
  }

  declare module.exports: WinstonExport;
}
