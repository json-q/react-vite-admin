import React from 'react';
import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export type AuthIndexRouteObject<T extends Record<string, any> = any> = IndexRouteObject & {
  auth?: string | string[];
} & {
  [P in keyof T]: T[P];
};

export type AuthNonIndexRouteObject<T extends Record<string, any> = any> = Omit<
  NonIndexRouteObject,
  'children'
> & {
  [P in keyof T]: T[P];
} & {
  auth?: string | string[];
  children?: AuthRouteObject<T>[];
};

export type AuthRouteObject<T extends Record<string, any> = any> =
  | AuthIndexRouteObject<T>
  | AuthNonIndexRouteObject<T>;

export interface getAuthRoutersOptions {
  routers: AuthRouteObject[];
  auth: string[];
  noAuthElement: (router: AuthRouteObject) => React.ReactNode;
  render?: (element: React.ReactElement | null) => React.ReactElement | null;
}

/**
 *
 * @param routers 默认路由
 * @param auth 身份权限
 * @param noAuthElement 回调函数，无权限显示的element
 * @param render 自定义渲染函数, 回传 <Outlet /> 以便后续逻辑渲染
 * @returns
 */
export const getAuthRouters = ({ routers, auth, noAuthElement, render }: getAuthRoutersOptions) => {
  function getMenus(items: AuthRouteObject[]) {
    return items.reduce((total: AuthRouteObject[], i) => {
      let result;
      if (!i.auth || (Array.isArray(i.auth) && !i.auth.length)) {
        result = i;
      } else {
        if (typeof i.auth === 'string') {
          if (auth.includes(i.auth)) {
            result = i;
          }
        } else if (Array.isArray(i.auth)) {
          if (auth.some((item) => i.auth?.includes(item))) {
            result = i;
          }
        }
      }
      if (result) {
        total.push(
          i.children?.length
            ? ({
                ...result,
                children: getMenus(i.children),
              } as AuthNonIndexRouteObject)
            : result,
        );
      }
      return total;
    }, []);
  }

  function getRouters(routers: AuthRouteObject[]) {
    return routers.reduce((total: AuthRouteObject[], router) => {
      let hasAuth = true;
      if (router.auth) {
        if (typeof router.auth === 'string') {
          if (!auth.includes(router.auth)) {
            hasAuth = false;
          }
        } else if (Array.isArray(router.auth) && router.auth.length) {
          // 若当前人权限在 router 的 auth 配置中一个都没有，则此人无该路由权限
          if (!router.auth.some((i) => auth.includes(i))) {
            hasAuth = false;
          }
        }
      }

      let _router = { ...router };
      if (!hasAuth) {
        _router = {
          ..._router,
          element: noAuthElement ? noAuthElement(router) : router.element,
        };
      } else if (React.isValidElement(router.element) && router.children) {
        _router = {
          ...router,
          element: React.cloneElement(router.element, {
            routers: router.children,
            authrouters: getMenus(router.children),
            ...router.element.props,
          }),
        };
      }

      if (!router.index && router.children?.length) {
        _router = {
          ..._router,
          children: getRouters(router.children),
        } as AuthNonIndexRouteObject;
      }

      total.push(_router);
      return total;
    }, []);
  }

  return getRouters([
    {
      element: render ? render(<Outlet />) : <Outlet />,
      children: routers,
    } as AuthNonIndexRouteObject,
  ]);
};
