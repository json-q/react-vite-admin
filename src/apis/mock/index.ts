import http from '@/services';
import type { Mock } from './typings';

export const login = (data: Mock.LoginParams) => {
  return http.post('/login', data);
};

export const getUserInfo = () => {
  return http.get<Mock.UserInfo>('/user-info');
};

export const getPublickKey = () => {
  return http.get<string>('/pbk');
};

export const logout = () => {
  return http.post('/logout');
};

export const getList = (params: Pagination) => {
  return http.get<List<Mock.TableListType>>('/list', params);
};

export const addData = (data: IAnyObject) => {
  return http.post('/add', data);
};

export const modifyData = (id: string, data: IAnyObject) => {
  return http.put(`/modify/${id}`, data);
};

export const delData = (id: string) => {
  return http.delete(`/del/${id}`);
};
