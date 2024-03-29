import type { MetaMenuAuthRouteObject } from '@/routers';
import type { StateCreator } from 'zustand';

export interface CacheRoutesConfig {
  label: string;
  key: string;
  state?: string;
  closable?: boolean;
}

export type AuthRoutesSliceType = {
  authRoutes: MetaMenuAuthRouteObject[];
  cacheRoutes: CacheRoutesConfig[];
  actionAuthRoutes: (authRoutes: MetaMenuAuthRouteObject[]) => void;
  actionCacheRoutes: (cacheRoutes: CacheRoutesConfig[]) => void;
};

const createUserSlice: StateCreator<
  AuthRoutesSliceType,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  authRoutes: [],
  cacheRoutes: [{ label: '首页', key: '/home', state: '', closable: false }], // 首页默认展示，无法关闭且在第一位
  actionAuthRoutes: (authRoutes) => set(() => ({ authRoutes })),
  actionCacheRoutes: (cacheRoutes) => set(() => ({ cacheRoutes })),
});
export default createUserSlice;
