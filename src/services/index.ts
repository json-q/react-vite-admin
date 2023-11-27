import NProgress from '@/config/nprogress';
import { TOKEN_CACHE, TOKEN_HEADER } from '@/constants';
import { message } from '@/hooks/useAppStatic';
import localCacha from '@/utils/localCacha';
import type {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { AxiosCanceler } from './helper/axiosCancel';
import checkStatus from './helper/checkStatus';

enum HttpEnum {
  SUCCESS = 200,
  UN_AUTH = 401, // 未授权或者 token 失效，需登录
  UN_OPERATOR = 403, // 无权操作
  UNKNOWN = 500, // 服务异常
  VALIDATE_PRAMERS = 501, // 参数异常
  ACCOUNT = 502, // 账号异常，禁止登录
}

const axiosCanceler = new AxiosCanceler();

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 20000,
  withCredentials: true,
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig<AxiosHeaders>) => {
        NProgress.start();
        axiosCanceler.addPending(config);
        const token = localCacha.get(TOKEN_CACHE);
        config.headers[TOKEN_HEADER] = token;
        return { ...config, ...config.headers };
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    /**
     * @description 响应拦截器
     */
    this.service.interceptors.response.use(
      (response) => {
        const { data, config } = response;
        NProgress.done();
        axiosCanceler.removePending(config);
        if (data.code == HttpEnum.UN_AUTH) {
          message.error(data.msg);
          return Promise.reject(data);
        }
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== HttpEnum.SUCCESS) {
          message.error(data.msg);
          return Promise.reject(data);
        }
        // * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        NProgress.done();
        // 请求超时没有 response
        if (error.message.indexOf('timeout') !== -1) message.error('请求超时，请稍后再试');
        if (response) checkStatus(response.status);
        return Promise.reject(error);
      },
    );
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<R<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<R<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<R<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<R<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}

export default new RequestHttp(config);
