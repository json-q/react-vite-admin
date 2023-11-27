import { logout } from '@/apis/mock';
import { LOGIN_PATH, TOKEN_CACHE } from '@/constants';
import { message } from '@/hooks/useAppStatic';
import { KeepAliveRefContext } from '@/layouts';
import useAllStores from '@/stores';
import localCacha from '@/utils/localCacha';
import { LockOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Dropdown, Row, type MenuProps } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

enum MenuItemKey {
  PASSWORD = 'PASSWORD',
  LOGOUT = 'LOGOUT',
}

const items: MenuProps['items'] = [
  {
    label: '修改密码',
    key: MenuItemKey.PASSWORD,
    icon: <LockOutlined />,
  },
  { type: 'divider' },
  {
    label: '退出登录',
    key: MenuItemKey.LOGOUT,
    danger: true,
    icon: <LogoutOutlined />,
  },
];

const PersonCenter: React.FC = () => {
  const navigate = useNavigate();
  const keepAliveRef = useContext(KeepAliveRefContext);
  const { currentUser, actionAuthRoutes, resetCurrentUser } = useAllStores(
    (state) => ({
      currentUser: state.currentUser,
      actionAuthRoutes: state.actionAuthRoutes,
      resetCurrentUser: state.resetCurrentUser,
    }),
    shallow,
  );

  const loginout = async () => {
    const { code } = await logout();
    if (code === 200) {
      localCacha.remove(TOKEN_CACHE);
      actionAuthRoutes([]);
      resetCurrentUser();
      keepAliveRef?.current?.cleanAllCache();
      message.success('退出成功');
      navigate(LOGIN_PATH);
    }
  };

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case MenuItemKey.PASSWORD:
        message.info(`Click on item ${key}`);
        break;
      case MenuItemKey.LOGOUT:
        loginout();
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <Row gutter={10} className={`cursor-pointer select-none px-3`}>
        <Col>
          <Avatar src={currentUser?.avator} icon={<UserOutlined />} />
        </Col>
        <Col>{currentUser?.nickName}</Col>
      </Row>
    </Dropdown>
  );
};

export default PersonCenter;
