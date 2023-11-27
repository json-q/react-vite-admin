import useAllStores from '@/stores';
import { Layout } from 'antd';
import { shallow } from 'zustand/shallow';
import LayoutLogo from './components/Logo';
import LayoutMenu from './components/Menu';

const { Sider } = Layout;

const LayoutSider: React.FC = () => {
  const { collapsed, layoutMode } = useAllStores(
    (state) => ({
      collapsed: state.collapsed,
      layoutMode: state.layoutMode,
    }),
    shallow,
  );

  return (
    <>
      {layoutMode === 'sider' ? (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="!sticky top-0 h-screen overflow-auto"
        >
          <LayoutLogo />
          <LayoutMenu />
        </Sider>
      ) : null}
    </>
  );
};

export default LayoutSider;
