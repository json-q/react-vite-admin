import { message } from '@/hooks/useAppStatic';
import { KeepAliveRefContext } from '@/layouts';
import useAllStores from '@/stores';
import { Tabs } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import useTabStyles from './styles';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const LayoutPageTab: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const keepAliveRef = useContext(KeepAliveRefContext);
  const [activeKey, setActiveKey] = useState<string>();
  const { cacheRoutes, actionCacheRoutes } = useAllStores(
    (state) => ({
      cacheRoutes: state.cacheRoutes,
      actionCacheRoutes: state.actionCacheRoutes,
    }),
    shallow,
  );
  const { styles } = useTabStyles();

  useEffect(() => {
    setActiveKey(pathname);
  }, [pathname]);

  const changePage = (newActiveKey: string) => {
    const _cache = [...cacheRoutes];
    const target = _cache.find((item) => item.key === newActiveKey);
    navigate(`${target!.key}${target!.state}`); // 跳转时 effect 会自动设置选中项，只是会有些许延迟
  };

  const removePage = (targetKey: TargetKey) => {
    if (cacheRoutes.length <= 1) return message.error('页签最少保留一项');
    // 将当前项从cache中删除，并重新赋值
    const delTarget = cacheRoutes.filter((item) => item.key !== targetKey);
    actionCacheRoutes(delTarget);
    keepAliveRef?.current?.removeCache(targetKey as string);
    // 关闭的页签是当前页面，默认跳转到最后一个页签
    targetKey === pathname && navigate(delTarget.at(-1)!.key);
  };

  return (
    <Tabs
      className={styles.tab}
      tabBarStyle={{ margin: 0, padding: '0 16px' }}
      type="editable-card"
      size="small"
      onChange={changePage}
      activeKey={activeKey}
      onEdit={removePage}
      items={cacheRoutes}
      hideAdd
      destroyInactiveTabPane
    />
  );
};

export default LayoutPageTab;
