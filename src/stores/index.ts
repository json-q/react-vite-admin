import { devtools, persist } from 'zustand/middleware'; // 调试工具
import { immer } from 'zustand/middleware/immer'; // 不可变数据
import { createWithEqualityFn } from 'zustand/traditional'; // shallow 优化状态渲染
import createLayoutSlice, { type LayoutSliceType } from './modules/createLayoutSlice';
import createRoutesSlice, { type AuthRoutesSliceType } from './modules/createRoutesSlice';
import createUserSlice, { type UserSliceType } from './modules/createUserSlice';

export type Store = LayoutSliceType & UserSliceType & AuthRoutesSliceType;

const useAllStores = createWithEqualityFn<Store>()(
  immer(
    devtools(
      persist(
        (...args) => ({
          ...createLayoutSlice(...args),
          ...createUserSlice(...args),
          ...createRoutesSlice(...args),
        }),
        {
          name: 'layoutSettings', // 本地缓存 name=>key 。partialize 函数 =>return 缓存内容
          partialize: (state) => ({
            colorPrimary: state.colorPrimary,
            menuTheme: state.menuTheme,
            themeMode: state.themeMode,
            layoutMode: state.layoutMode,
            widthFixed: state.widthFixed,
            sizeMode: state.sizeMode,
          }),
        },
      ),
      {
        enabled: process.env.NODE_ENV !== 'production', // devtools 生产环境关闭
      },
    ),
  ),
  Object.is,
);

export default useAllStores;
