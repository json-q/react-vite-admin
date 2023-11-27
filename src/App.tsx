import { useRequest, useTitle } from 'ahooks';
import { Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import LazyLoading from './components/LazyLoading';
import { LOGIN_PATH, NOT_PAGE_PATH, TOKEN_CACHE } from './constants';
import useAppTips from './hooks/useAppStatic';
import { useMatchTitle } from './hooks/useLayout';
import NotAuth from './pages/403';
import { layoutRouters, noAuthRoutes } from './routers';
import { getAuthRouters, type AuthRouteObject } from './routers/AuthRoute';
import useAllStores from './stores';
import localCacha from './utils/localCacha';

const App: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [authRoutes, setAuthRouters] = useState<AuthRouteObject[]>([]);
  useAppTips();
  useTitle(useMatchTitle(pathname));
  const { fetchCurrentUser, currentUser } = useAllStores(
    (state) => ({
      fetchCurrentUser: state.fetchCurrentUser,
      currentUser: state.currentUser,
    }),
    shallow,
  );
  const { loading, run } = useRequest(fetchCurrentUser, {
    manual: true,
    onError: () => navigate(LOGIN_PATH, { replace: true }), // 请求用户信息失败，身份未经认证，跳转登录页
  });

  // 根据用户信息获取权限路由（不包括登录和404页面）
  useEffect(() => {
    const _routers = getAuthRouters({
      routers: layoutRouters,
      noAuthElement: () => <NotAuth />,
      render: (element) => (loading ? <LazyLoading /> : element),
      auth: currentUser?.auth || [],
    });
    setAuthRouters(_routers);
  }, [loading]);

  //
  useEffect(() => {
    //  无 token 访问时，访问这两个页面无需认证，其余跳转
    const noNeedAuth = [LOGIN_PATH, NOT_PAGE_PATH].includes(pathname);
    if (!localCacha.get(TOKEN_CACHE) && !noNeedAuth) {
      return navigate(LOGIN_PATH, { replace: true });
    }

    // 无用户信息时，除登录页，其余页面请求认证
    !currentUser && pathname !== LOGIN_PATH && run('');
  }, [pathname]);

  return (
    <Suspense fallback={<LazyLoading />}>{useRoutes([...noAuthRoutes, ...authRoutes])}</Suspense>
  );
};

export default App;
