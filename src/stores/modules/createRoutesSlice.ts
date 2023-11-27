import type { MetaMenuAuthRouteObject } from '@/routers';
import type { StateCreator } from 'zustand';

export interface CacheRoutesConfig {
  label: string;
  key: string;
  state?: string;
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
  cacheRoutes: [],
  actionAuthRoutes: (authRoutes) => set(() => ({ authRoutes })),
  actionCacheRoutes: (cacheRoutes) => set(() => ({ cacheRoutes })),
});
export default createUserSlice;
