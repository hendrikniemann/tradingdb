/* eslint-disable */

/**
 * https://rethinkdb.com/api/javascript/
 */
declare module "rethinkdb" {
  declare class Cursor {
    hasNext(): boolean;
    each(cb: (err: Error, row: any) => void, done?: () => void): void;
    each<T>(cb: (err: Error, row: T) => void, done?: () => void): void;
    each(cb: (err: Error, row: any) => boolean, done?: () => void): false | void;
    each<T>(cb: (err: Error, row: T) => boolean, done?: () => void): false | void;
    next(cb: (err: Error, row: any) => void): void;
    next<T>(cb: (err: Error, row: T) => void): void;
    toArray<T>(): Promise<T[]>;
    close(cb: (err: Error) => void): void;
    close(): Promise<void>;
  }

  declare interface Row extends Expression<any> {
    (name: string): Expression<any>;
  }

  declare interface ConnectionOptions {
    host?: string;
    port?: number;
    db?: string;
    user?: string;
    password?: string;
    timeout?: number;
    ssl?: {
      ca: Buffer[];
    };
  }

  declare interface NoReplyWait {
    noreplyWait: boolean;
  }

  declare interface Connection {
    open: boolean;
    close(opts?: NoReplyWait): Promise<void>;
    reconnect(opts?: NoReplyWait): Promise<Connection>;

    use(dbName: string): void;
    addListener(event: string, cb: Function): void;
    on(event: string, cb: Function): void;
  }

  declare interface Db {
    tableCreate(name: string, options?: TableOptions): Operation<CreateResult>;
    tableDrop(name: string): Operation<DropResult>;
    tableList(): Operation<string[]>;
    table(name: string, options?: GetTableOptions): Table;
  }

  declare interface TableOptions {
    primary_key?: string;
    durability?: string;
    cache_size?: number;
    datacenter?: string;
  }

  declare interface GetTableOptions {
    useOutdated: boolean;
  }

  declare interface Writeable {
    update(obj: any, options?: UpdateOptions & ReturnChanges): Operation<WriteResultWithChanges>;
    update(obj: any, options?: UpdateOptions): Operation<WriteResult>;
    replace(obj: any, options?: UpdateOptions): Operation<WriteResult>;
    replace(expr: ExpressionFunction<any>): Operation<WriteResult>;
    delete(options?: UpdateOptions): Operation<WriteResult>;
  }

  declare interface ChangesOptions {
    squash: boolean | number;
    changefeedQueueSize: number;
    includeInitial: boolean;
    includeStates: boolean;
    includeOffsets: boolean;
    includeTypes: boolean;
  }

  declare interface HasFields<T> {
    hasFields(selector: BooleanMap): T;
    hasFields(...fields: string[]): T;
  }

  declare interface Table extends Sequence, HasFields<Sequence> {
    indexCreate(name: string, index?: ExpressionFunction<any>): Operation<CreateResult>;
    indexDrop(name: string): Operation<DropResult>;
    indexList(): Operation<string[]>;

    insert(obj: any | any[], options?: InsertOptions & ReturnChanges): Operation<InsertResultWithChanges>;
    insert(obj: any | any[], options?: InsertOptions): Operation<InsertResult>;

    get(key: string): Sequence; // primary key
    getAll(key: string, index?: Index): Sequence; // without index defaults to primary key
    getAll(keys: string[]): Sequence;
  }

  declare interface Sequence extends Operation<Cursor>, Writeable {
    between(lower: any, upper: any, index?: Index): Sequence;

    filter(rql: ExpressionFunction<boolean>): Sequence;
    filter(rql: Expression<boolean>): Sequence;
    filter(obj: { [key: string]: any }): Sequence;
    changes(opts?: ChangesOptions): Sequence;
    innerJoin(sequence: Sequence, join: JoinFunction<boolean>): Sequence;
    outerJoin(sequence: Sequence, join: JoinFunction<boolean>): Sequence;
    eqJoin(leftAttribute: string, rightSequence: Sequence, index?: Index): Sequence;
    eqJoin(leftAttribute: ExpressionFunction<any>, rightSequence: Sequence, index?: Index): Sequence;
    zip(): Sequence;
    map(transform: ExpressionFunction<any>): Sequence;
    withFields(...selectors: any[]): Sequence;
    concatMap(transform: ExpressionFunction<any>): Sequence;
    orderBy(...keys: string[]): Sequence;
    orderBy(...sorts: Sort[]): Sequence;
    skip(n: number): Sequence;
    limit(n: number): Sequence;
    slice(start: number, end?: number): Sequence;
    nth(n: number): Expression<any>;
    indexesOf(obj: any): Sequence;
    isEmpty(): Expression<boolean>;
    union(sequence: Sequence): Sequence;
    sample(n: number): Sequence;
    reduce(r: ReduceFunction<any>, base?: any): Expression<any>;
    count(): Expression<number>;
    distinct(): Sequence;
    groupedMapReduce(group: ExpressionFunction<any>, map: ExpressionFunction<any>, reduce: ReduceFunction<any>, base?: any): Sequence;
    groupBy(...aggregators: Aggregator[]): Expression<Object>; // TODO: reduction object
    contains(prop: string): Expression<boolean>;
    pluck(...props: string[]): Sequence;
    without(...props: string[]): Sequence;
  }

  declare interface ExpressionFunction<U> {
      (doc: Expression<any>): Expression<U>;
  }

  declare interface JoinFunction<U> {
      (left: Expression<any>, right: Expression<any>): Expression<U>;
  }

  declare interface ReduceFunction<U> {
      (acc: Expression<any>, val: Expression<any>): Expression<U>;
  }

  declare type ReturnChanges = {
    returnChanges: true | 'always',
  }

  declare type InsertOptions = {
    conflict?: 'error' | 'replace' | 'update' | ((id: string, oldDoc: any, newDoc: any) => any);
    durability?: 'hard' | 'soft';
    returnChanges?: boolean | 'always';
  }

  declare type UpdateOptions = {
    nonAtomic?: boolean;
    durability?: 'hard' | 'soft';
    returnChanges?: boolean;
  }

  declare interface WriteResult {
    inserted: number;
    replaced: number;
    unchanged: number;
    errors: number;
    deleted: number;
    skipped: number;
    first_error: Error;
  }

  declare interface WriteResultWithChanges extends WriteResult {
    changes: Array<{ new_val: any, old_val: any }>;
  }

  declare interface InsertResult extends WriteResult {
    generated_keys: string[];
  }

  declare interface InsertResultWithChanges extends InsertResult {
    changes: Array<{ new_val: any, old_val: null }>;
  }

  declare interface JoinResult {
      left: any;
      right: any;
  }

  declare interface CreateResult {
      created: number;
  }

  declare interface DropResult {
      dropped: number;
  }

  declare interface Index {
      index: string;
      left_bound?: string; // 'closed'
      right_bound?: string; // 'open'
  }

  declare interface BooleanMap {
    [ key: string ]: Boolean | BooleanMap;
  }

  declare interface Expression<T> extends Writeable, Operation<T>, HasFields<Expression<number>> {
    merge(query: Expression<Object>): Expression<Object>;
    append(prop: string): Expression<Object>;
    contains(prop: string): Expression<boolean>;
    and(b: boolean | Expression<boolean>): Expression<boolean>;
    or(b: boolean | Expression<boolean>): Expression<boolean>;
    eq(v: any | Expression<any>): Expression<boolean>;
    ne(v: any | Expression<any>): Expression<boolean>;
    not(): Expression<boolean>;
    gt(value: T): Expression<boolean>;
    ge(value: T): Expression<boolean>;
    lt(value: T): Expression<boolean>;
    le(value: T): Expression<boolean>;
    add(n: number): Expression<number>;
    sub(n: number | Time, ...numbers: number[]): Expression<number>;
    mul(n: number): Expression<number>;
    div(n: number): Expression<number>;
    mod(n: number): Expression<number>;
    default(value: T): Expression<T>;
  }

  declare interface OperationOptions {
    readMode: "single" | "majority" | "outdated";
    timeFormat: "native" | "raw";
    profile: boolean;
    durability: "hard" | "soft";
    groupFormat: "native" | "raw";
    noreply: boolean;
    db: string;
    arrayLimit: number;
    binaryFormat: "native" | "raw";
    minBatchRows: number;
    maxBatchRows: number;
    maxBatchBytes: number;
    maxBatchSeconds: number;
    firstBatchScaledownFactor: number;
  }

  declare interface Operation<T> {
    run(conn: Connection, opts?: OperationOptions): Promise<T>;
  }

  declare interface Aggregator { }

  declare interface Sort { }

  declare interface Time {
    epoch_time: number;
    timezone: string;
  }

  declare interface Binary {
    data: string;
  }

  declare module.exports: {
    connect(opts: ConnectionOptions | string): Promise<Connection>;
    dbCreate(name: string): Operation<CreateResult>;
    dbDrop(name: string): Operation<DropResult>;
    dbList(): Operation<string[]>;

    db(name: string): Db;
    table(name: string, options?: { useOutdated: boolean }): Table;

    asc(property: string): Sort;
    desc(property: string): Sort;

    count: Aggregator;
    sum(prop: string): Aggregator;
    avg(prop: string): Aggregator;

    row: Row;
    expr(stuff: any): Expression<any>;

    now(): Expression<Time>;
    uuid(input?: string): Operation<string>;
    branch(test: Expression<boolean>, trueBranch: Expression<any>, falseBranch: Expression<any>): Expression<any>;

    js(jsString: string, opts?: { timeout: number }): Operation<any>;
  }
}
