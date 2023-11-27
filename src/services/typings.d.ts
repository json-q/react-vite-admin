declare interface R<T = any> {
  code: number;
  msg: string;
  data: T;
}

declare interface List<T = any> {
  list: T[];
  total: number;
}

declare interface Pagination {
  current?: number;
  pageSize?: number;
  [x: string]: any;
}

declare type IAnyObject = Record<string, any>;
