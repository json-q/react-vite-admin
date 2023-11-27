import useAllStores from '@/stores';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Col, Layout, Row, Space } from 'antd';
import { shallow } from 'zustand/shallow';
import LayoutLogo from '../Sider/components/Logo';
import LayoutMenu from '../Sider/components/Menu';
import HeaderBreadcrumb from './components/BreadCrumb';
import FullScreen from './components/FullScreen';
import LocalSettings from './components/LocalSettings';
import PersonCenter from './components/PersonCenter';
import useHeaderStyles from './styles';
const { Header } = Layout;

const ActionButton: React.FC = () => {
  return (
    <Space>
      <FullScreen />
      <PersonCenter />
      <LocalSettings />
    </Space>
  );
};

const LayoutHeader: React.FC = () => {
  const { styles } = useHeaderStyles();
  const { collapsed, actionCollapsed, layoutMode } = useAllStores(
    (state) => ({
      collapsed: state.collapsed,
      actionCollapsed: state.actionCollapsed,
      layoutMode: state.layoutMode,
    }),
    shallow,
  );

  return (
    <Header className={styles.header}>
      <Row justify="space-between" align="middle">
        {/* 侧边布局下的 header */}
        {layoutMode === 'sider' && (
          <Col>
            <Space>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => actionCollapsed(!collapsed)}
              />
              <HeaderBreadcrumb />
            </Space>
          </Col>
        )}
        {/* 顶部布局下的 header */}
        {layoutMode === 'top' && (
          <Col flex={1} className="flex">
            <LayoutLogo />
            <LayoutMenu />
          </Col>
        )}
        <Col>
          <ActionButton />
        </Col>
      </Row>
    </Header>
  );
};

export default LayoutHeader;
