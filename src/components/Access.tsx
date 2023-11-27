import type { Auth } from '@/apis/mock/typings';
import useAccess from '@/hooks/useAccess';
import type { FC, PropsWithChildren } from 'react';

interface AccessProps {
  access: Auth | Auth[];
}

const Access: FC<PropsWithChildren<AccessProps>> = ({ access, children }) => {
  const hasAccess = useAccess(access);

  return hasAccess ? children : null;
};

export default Access;
