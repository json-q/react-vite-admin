export namespace Mock {
  interface UserInfoDetail {
    nickName: string;
    id: string;
    avator: string;
    email: string;
    auth: Auth[];
  }

  type Auth = 'admin' | 'user' | 'visitor';

  interface UserInfo {
    userInfo: UserInfoDetail;
  }

  interface LoginParams {
    username: string;
    password: string;
    captcha: string;
  }

  interface TableListType {
    id: string;
    description: string;
    name: string;
    county: string;
    zip: string;
    ip: string;
    updateTime: string;
  }
}
