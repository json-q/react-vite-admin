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
const DynamicRoute = lazy(() => import('@/pages/DynamicRoute'));
const NotFound = lazy(() => import('@/pages/404'));

type MetaMenu = {
  name?: string;
  icon?: React.ReactNode;
  hideMenu?: boolean; // 该页面是否挂载到菜单栏中，默认 false
};
type Cache = {
  noCache?: boolean; // 默认全部缓存，不缓存，需明确设置到某个组件
};

export type MetaMenuAuthRouteObject = AuthRouteObject<MetaMenu & Cache>;

// 动态路由正常情况下是不会在 Menu 中显示，请尽量配置 hideMenu:true
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
            hideMenu: true,
          },
        ],
      },
      {
        path: '/dynamic-router/:id',
        name: '动态路由',
        element: <DynamicRoute />,
        hideMenu: true,
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
