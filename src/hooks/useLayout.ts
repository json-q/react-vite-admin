import { layoutRouters, noAuthRoutes, type MetaMenuAuthRouteObject } from '@/routers';
import useAllStores from '@/stores';
import type { MenuProps } from 'antd';
import type { SubMenuType } from 'antd/es/menu/hooks/useItems';
import { matchRoutes } from 'react-router-dom';

export type MenuItem = Required<MenuProps>['items'][number] & SubMenuType;

/**
 * 权限路由整合为菜单
 * @param authRouters
 * @returns menus
 */
const generateMenu = (authRouters: MetaMenuAuthRouteObject[]) => {
  const menus: MenuItem[] = [];
  authRouters.forEach((item) => {
    if (!item.hideMenu) {
      const menuItem = {
        key: item.path,
        label: item.name,
        icon: item.icon,
      } as MenuItem;
      if (Array.isArray(item.children) && item.children.length > 0) {
        const childrens = generateMenu(item.children);
        menuItem.children = childrens;
      }
      menus.push(menuItem);
    }
  });
  return menus;
};

/** 以 hooks 格式导出 */
export const useMenu = () => {
  const authRouters = useAllStores((state) => state.authRoutes);
  return generateMenu(authRouters);
};

/**
 * 根据 path 匹配当前路由的标题 "name"
 * @param pathname
 * @returns string
 */
export const useMatchTitle = (pathname: string): string => {
  const matched = matchRoutes([...noAuthRoutes, ...layoutRouters], pathname) || [];
  const title = matched[matched.length - 1]?.route.name || '';
  if (title) return title + ' - ' + import.meta.env.VITE_APP_TITLE;
  return import.meta.env.VITE_APP_TITLE;
};
