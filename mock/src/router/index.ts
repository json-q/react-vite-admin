import express from 'express';
import { mock } from 'mockjs';
import R from '../config';

type Pagination = {
  current?: number;
  pageSize?: number;
  [x: string]: any;
};

const AdminToken = 'admin_token';
const UserToken = 'user_token';
const VisitorToken = 'visitor_token';
const PublickKey = '_10000X1_1X0000';
const avator = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';

const lazy = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, 2000);
  });
};

export default (app: express.Router) => {
  // 登录
  app.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    if (password !== '123456') return res.json(R.fail('账号或密码错误'));
    let token = '';
    if (username === 'admin') token = AdminToken;
    else if (username === 'user') token = UserToken;
    else if (username === 'visitor') token = VisitorToken;
    await lazy();
    res.send(R.ok(token));
  });

  // 加密公钥
  app.get('/pbk', (req, res, next) => {
    return res.send(R.ok(PublickKey));
  });

  // 用户信息
  app.get('/user-info', async (req, res, next) => {
    const { authentication } = req.headers;
    if (!authentication) res.json(R.fail('未认证授权'));
    const id = mock('@id'),
      email = mock('@email');
    if (authentication === AdminToken) {
      return res.send(
        R.ok({
          userInfo: { nickName: 'Admin', id, avator, email, auth: ['admin'] },
        }),
      );
    } else if (authentication === UserToken) {
      return res.send(
        R.ok({
          userInfo: { nickName: 'User', id, avator, email, auth: ['user'] },
        }),
      );
    } else if (authentication === VisitorToken) {
      res.send(
        R.ok({
          userInfo: { nickName: 'Visitor', id, avator, email, auth: ['visitor'] },
        }),
      );
    }
    res.send(R.fail());
  });

  // 退出登录
  app.post('/logout', async (req, res, next) => {
    await lazy();
    res.send(R.ok());
  });

  // 表格数据
  app.get('/list', async (req: { query: Pagination }, res, next) => {
    const { current, pageSize } = req.query;
    const data = mock({
      'list|10': [
        {
          id: '@guid',
          description: '@cparagraph(2, 5)',
          name: '@cname',
          county: '@county(true)',
          zip: '@zip',
          ip: '@ip',
          status: "@pick(['关闭', '运行中', '异常'])",
          updateTime: '@datetime',
        },
      ],
      current: Number(current),
      pageSize: Number(pageSize),
      total: 102,
    });
    await lazy();
    res.send(R.ok(data));
  });

  // 数据新增
  app.post('/add', async (req, res, next) => {
    await lazy();
    res.send(R.ok(req.body));
  });

  // 数据修改
  app.put('/modify/:id', async (req, res, next) => {
    const id = req.params.id,
      data = req.body;
    if (!id) return res.send(R.fail('参数格式出错'));
    await lazy();
    res.send(R.ok({ id, data }));
  });

  // 数据删除
  app.delete('/del/:id', async (req, res, next) => {
    const id = req.params.id;
    if (!id) return res.send(R.fail('参数格式出错'));
    await lazy();
    res.send(R.ok(id));
  });
};
