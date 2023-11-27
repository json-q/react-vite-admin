import LazyLoading from '@/components/LazyLoading';
import { KeepAliveRefContext } from '@/layouts';
import { layoutRouters } from '@/routers';
import useAllStores from '@/stores';
import { Layout, theme } from 'antd';
import KeepAlive from 'keepalive-for-react';
import { Suspense, memo, useContext } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';

const { Content } = Layout;

const MemoizedKeepAlive = memo(KeepAlive, (prev, next) => {
  return prev.activeName === next.activeName;
});

const getComp = (pathname: string) => matchRoutes(layoutRouters, pathname)?.at(-1);

const LayoutContent: React.FC = () => {
  const { pathname } = useLocation();
  const keepAliveRef = useContext(KeepAliveRefContext);
  const { token } = theme.useToken();
  const widthFixed = useAllStores((state) => state.widthFixed);
  const currentRoute = getComp(pathname)?.route;

  return (
    <Content
      className="flex flex-col p-[16px] pt-[8px] overflow-auto container-height"
      style={widthFixed ? { width: '100%', maxWidth: token.screenLGMax, margin: '0 auto' } : {}}
    >
      <MemoizedKeepAlive
        aliveRef={keepAliveRef}
        activeName={pathname}
        cache={!currentRoute?.noCache}
        maxLen={10}
      >
        {/* 不使用 Outlet ，此渲染方式缓存的组件会存在明显异常，手动查找路由需要渲染的组件 */}
        {/* <Outlet /> */}
        <Suspense fallback={<LazyLoading height="100%" />}>{currentRoute?.element}</Suspense>
      </MemoizedKeepAlive>
    </Content>
  );
};

export default LayoutContent;
