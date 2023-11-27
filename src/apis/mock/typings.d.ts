export namespace Mock {
  export interface UserInfoDetail {
    nickName: string;
    id: string;
    avator: string;
    email: string;
    auth: Auth[];
  }

  export type Auth = 'admin' | 'user' | 'visitor';

  export interface UserInfo {
    userInfo: UserInfoDetail;
  }

  export interface LoginParams {
    username: string;
    password: string;
    captcha: string;
  }

  export interface TableListType {
    id: string;
    description: string;
    name: string;
    county: string;
    zip: string;
    ip: string;
    updateTime: string;
  }
}
