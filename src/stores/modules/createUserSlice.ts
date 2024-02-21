import { getUserInfo } from '@/apis/mock';
import type { Mock } from '@/apis/mock/typings';
import type { StateCreator } from 'zustand';

export type UserSliceType = {
  currentUser?: Mock.UserInfoDetail;
  fetchCurrentUser: (path: string) => Promise<void>;
  resetCurrentState: () => void;
};

const createUserSlice: StateCreator<
  UserSliceType,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  currentUser: undefined,
  fetchCurrentUser: async () => {
    const { data } = await getUserInfo();
    set({ currentUser: data.userInfo });
  },
  resetCurrentState: () =>
    set(() => ({
      currentUser: undefined,
      authRoutes: [],
      cacheRoutes: [{ label: '首页', key: '/home', state: '', closable: false }],
    })),
});
export default createUserSlice;
