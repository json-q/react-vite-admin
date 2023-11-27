import useAllStores from '@/stores';
import { ErrorBoundary } from '@ant-design/pro-components';
import { Layout } from 'antd';
import type { KeepAliveRef } from 'keepalive-for-react';
import { createContext, useEffect, useMemo, useRef } from 'react';
import type { MetaMenuAuthRouteObject } from '../routers';
import LayoutContent from './components/Content';
import LayoutHeader from './components/Header';
import LayoutPageTab from './components/PageTab';
import LayoutSider from './components/Sider';

interface LayoutProps {
  routers?: MetaMenuAuthRouteObject[]; // Layout 默认路由
  authrouters?: MetaMenuAuthRouteObject[]; // 权限路由
}

// 由 Content 对 KeepAliveRef 进行绑定赋值，再将 KeepAliveRef 提供给 Header 消费
export const KeepAliveRefContext = createContext<React.RefObject<KeepAliveRef> | undefined>(
  undefined,
);

const LayoutMode: React.FC<LayoutProps> = ({ authrouters = [] }) => {
  const keepAliveRef = useRef<KeepAliveRef>(null);
  const actionAuthRoutes = useAllStores((state) => state.actionAuthRoutes);

  useEffect(() => {
    actionAuthRoutes(authrouters);
  }, [authrouters]);

  return (
    <ErrorBoundary>
      <Layout hasSider>
        <LayoutSider />
        <Layout>
          <KeepAliveRefContext.Provider value={keepAliveRef}>
            {useMemo(
              () => (
                <>
                  <LayoutHeader />
                  <LayoutPageTab />
                  <LayoutContent />
                </>
              ),
              [],
            )}
          </KeepAliveRefContext.Provider>
        </Layout>
      </Layout>
    </ErrorBoundary>
  );
};

export default LayoutMode;
