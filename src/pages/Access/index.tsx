import Access from '@/components/Access';
import useAccess from '@/hooks/useAccess';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess('admin');

  return (
    <div>
      <Access access="user">
        <Button>只有User权限可以的按钮</Button>
      </Access>
      <p>当前人权限admin：{access ? '是' : '否'}</p>
      <p>按钮需要user权限才能查看</p>
    </div>
  );
};
export default AccessPage;
