import type { Mock } from '@/apis/mock/typings';
import useAllStores from '@/stores';

/**
 * 当前用户权限默认为数组，根据入参身份进行权限判断
 * @param access 权限 string | string[]
 * @returns boolean
 */
const useAccess = (access: Mock.Auth | Mock.Auth[]) => {
  const currentUser = useAllStores((state) => state.currentUser);
  const auth = currentUser?.auth || [];

  if (auth.length === 0) return false;

  if (typeof access === 'string') {
    return auth.includes(access);
  } else if (Array.isArray(access)) {
    return access.some((item) => auth.includes(item));
  }
  return false;
};

export default useAccess;
