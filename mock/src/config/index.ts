export interface Result<T = any> {
  code: number;
  data: T;
  msg: string;
}

interface R_Type {
  ok: <T>(data?: T) => Result;
  fail: (msg?: string) => Result;
}
class R implements R_Type {
  ok<T>(data?: T): Result {
    return { code: 200, data, msg: '操作成功' };
  }
  fail(msg?: string): Result {
    return { code: 500, data: null, msg: msg || '操作失败' };
  }
}
export default new R();
