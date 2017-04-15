/* eslint-disable */
declare module 'koa' {
  declare type HeaderMap = { [name: string]: string };

  declare interface Request {
    header: HeaderMap,
    headers: HeaderMap,
    method: 'get' | 'post' | 'delete' | 'put',
    length: number,
    url: string,
    origin: string,
    href: string,
    path: string,
    querystring: string,
    search: string,
    host: string,
    hostname: string,
    type: string,
    charset: string,
    query: { [key: string]: string },
    protocol: 'http' | 'https',
    secure: boolean,
    ip: string,
    ips: string[],
    is(...types: string[]): boolean,
  }

  declare interface Response {
    header: HeaderMap,
    headers: HeaderMap,
    socket: any,
    status: number,
    message: string,
    length: number,
    body: string | null,
    redirect(url: string, alt?: string): void,
    is(...types: string[]): boolean,
    headerSent: boolean,
  }

  declare type SetterGetter = {
    get(key: string): string,
    set(key: string, value: string): void,
  }

  declare interface Context extends Request, Response {
    request: Request,
    response: Response,
    state: { [key: string]: any },
    cookies: SetterGetter,
    throw(message?: string, status?: number): void,
    throw(status?: number, message?: string): void,
    assert(value: any, message?: string, status?: number): void,
  }

  declare type SimpleMiddleware = (ctx: Context) => any;
  declare type AsyncMiddleware = (ctx: Context, next: () => Promise<void>) => Promise<any>;

  declare type Middleware = SimpleMiddleware | AsyncMiddleware;

  declare class Koa {
    constructor(): Koa,
    use(middleware: Middleware | Koa): void,
    listen(port: number): void,
    callback(): () => void,
  }

  declare module.exports: Class<Koa>;
}
