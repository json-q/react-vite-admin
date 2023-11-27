import {
  CrownOutlined,
  HomeOutlined,
  InsertRowBelowOutlined,
  SwitcherOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { AuthRouteObject } from './AuthRoute';

const Layout = lazy(() => import('@/layouts'));
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const Access = lazy(() => import('@/pages/Access'));
const TableList = lazy(() => import('@/pages/TableList'));
const KeepComp = lazy(() => import('@/pages/KeepComp'));
const Test = lazy(() => import('@/pages/Test'));
const NotFound = lazy(() => import('@/pages/404'));

type MetaMenu = {
  name?: string;
  icon?: React.ReactNode;
};
type Cache = {
  noCache?: boolean; // 默认全部缓存，不缓存，需明确设置到某个组件
};

export type MetaMenuAuthRouteObject = AuthRouteObject<MetaMenu & Cache>;

export const layoutRouters: MetaMenuAuthRouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        name: '首页',
        element: <Home />,
        icon: <HomeOutlined />,
      },
      {
        path: '/access',
        name: '权限示例',
        element: <Access />,
        icon: <CrownOutlined />,
        auth: ['admin', 'user'],
      },
      {
        path: '/table-list',
        name: '表格示例',
        element: <TableList />,
        icon: <TableOutlined />,
        auth: 'admin',
      },
      {
        path: '/keep-comp',
        name: '组件缓存',
        element: <KeepComp />,
        icon: <SwitcherOutlined />,
      },
      {
        path: '/test',
        name: '测试',
        icon: <InsertRowBelowOutlined />,
        element: <Test />,
        children: [
          {
            path: '/test/t1',
            name: '测试1',
            element: <Test />,
            noCache: true,
          },
          {
            path: '/test/t2',
            name: '测试2',
            element: <Test />,
          },
          {
            path: '/test/t3',
            name: '测试3',
            element: <Test />,
          },
          {
            path: '/test/t4',
            name: '测试4',
            element: <Test />,
          },
          {
            path: '/test/t5',
            name: '测试5',
            element: <Test />,
          },
          {
            path: '/test/t6',
            name: '测试6',
            element: <Test />,
          },
          {
            path: '/test/t7',
            name: '测试7',
            element: <Test />,
          },
          {
            path: '/test/t8',
            name: '测试8',
            element: <Test />,
          },
          {
            path: '/test/t9',
            name: '测试9',
            element: <Test />,
          },
          {
            path: '/test/t10',
            name: '测试10',
            element: <Test />,
          },
          {
            path: '/test/t11',
            name: '测试11',
            element: <Test />,
          },
          {
            path: '/test/t12',
            name: '测试12',
            element: <Test />,
          },
        ],
      },
    ],
  },
];

export const noAuthRoutes: MetaMenuAuthRouteObject[] = [
  {
    path: '/login',
    name: '登录',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
