/* eslint-disable */
declare module 'koa-mount' {
  import type Koa, { Middleware } from 'koa';

  declare module.exports: (route?: string, middleware: Middleware | Koa) => Middleware;
}
