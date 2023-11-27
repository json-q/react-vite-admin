import { getUserInfo } from '@/apis/mock';
import type { Mock } from '@/apis/mock/typings';
import type { StateCreator } from 'zustand';

export type UserSliceType = {
  currentUser?: Mock.UserInfoDetail;
  fetchCurrentUser: (path: string) => Promise<void>;
  resetCurrentUser: () => void;
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
  resetCurrentUser: () => set(() => ({ currentUser: undefined, authRoutes: [] })),
});
export default createUserSlice;
