import { useMenu } from '@/hooks/useLayout';
import { layoutRouters, noAuthRoutes } from '@/routers';
import useAllStores from '@/stores';
import type { CacheRoutesConfig } from '@/stores/modules/createRoutesSlice';
import { useEventListener } from 'ahooks';
import { theme, type MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

const getOpenKeys = (pathname: string) => {
  let pathStr: string = '';
  const openKeys: string[] = [];
  const pathSplitArr = pathname.split('/').map((i) => '/' + i);
  // 循环时，去除根路径的 / 和当前路径
  for (let i = 1; i < pathSplitArr.length - 1; i++) {
    pathStr += pathSplitArr[i];
    openKeys.push(pathStr);
  }
  return openKeys;
};

const useMenuState = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [selectKey, setSelecyKey] = useState('');
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { token } = theme.useToken();
  const menus = useMenu();
  const { collapsed, layoutMode, cacheRoutes, actionCollapsed, actionCacheRoutes } = useAllStores(
    (state) => ({
      collapsed: state.collapsed,
      layoutMode: state.layoutMode,
      cacheRoutes: state.cacheRoutes,
      actionCollapsed: state.actionCollapsed,
      actionCacheRoutes: state.actionCacheRoutes,
    }),
    shallow,
  );

  // 菜单在不同宽度下是否收缩
  useEventListener('resize', () => {
    const screenWidth = document.body.clientWidth;
    screenWidth > token.screenLG && actionCollapsed(false);
    screenWidth < token.screenLG && actionCollapsed(true);
  });

  useEffect(() => {
    setSelecyKey(pathname);
    // 侧边栏收缩时，会触发 onOpenKeys 事件，将 openKeys 置空，导致还原时 sub 收缩
    !collapsed && setOpenKeys(getOpenKeys(pathname));
    layoutMode === 'top' && setOpenKeys([]);
  }, [pathname, collapsed, layoutMode]);

  const getCacheData = (selectKey: string, search: string, cacheRoutes: CacheRoutesConfig[]) => {
    if (!selectKey) return []; // 最初加载时，key为空
    const _cache: CacheRoutesConfig[] = JSON.parse(JSON.stringify(cacheRoutes));
    // 根据 path 匹配路由对应的数据
    const matched = matchRoutes([...noAuthRoutes, ...layoutRouters], selectKey) || [];
    const matchData = matched[matched.length - 1]?.route;
    const i = _cache.findIndex((item) => item.key === selectKey); // 查找是否已缓存该页面
    if (i === -1) {
      _cache.push({
        label: matchData!.name || '',
        key: matchData.path || '',
        state: search,
      });
      return _cache;
    } else {
      if (_cache[i].state === search) return _cache;
      else {
        _cache[i].state = search;
        return _cache;
      }
    }
  };

  useEffect(() => {
    const newCache = getCacheData(selectKey, search, cacheRoutes);
    actionCacheRoutes(newCache);
  }, [selectKey]);

  /**
   * 菜单的 onClick 事件
   */
  const onClickMenuItem: MenuProps['onClick'] = ({ key }) => {
    if (key === selectKey) return;
    const target = cacheRoutes.find((item) => item.key === key);
    setSelecyKey(key);
    if (target) navigate(`${key}${target.state}`);
    else navigate(key);
  };

  /**
   * 受控的 SubMenu 点击事件，并实现手风琴 Sub 效果
   */
  const onOpenKeys: MenuProps['onOpenChange'] = (openKeys) => {
    // 点击该 sub 之前未有展开的 sub
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    // 点击的是 subMenu 之下的嵌套 sub，正常展开
    // rc-menu-more 是顶部布局的情况下，按钮【更多】的 key，当点击更多时，需要正常展开
    if (latestOpenKey.includes(openKeys[0]) || openKeys[0] === 'rc-menu-more')
      return setOpenKeys(openKeys);
    // 点击的 sub 和之前的不一样，则关闭旧 sub，展开新 sub
    setOpenKeys([latestOpenKey]);
  };

  return {
    onClickMenuItem,
    onOpenKeys,
    selectKey: selectKey,
    openKeys: openKeys,
    menus,
  };
};

export default useMenuState;
