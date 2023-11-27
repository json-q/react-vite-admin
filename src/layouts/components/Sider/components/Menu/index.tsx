import useAllStores from '@/stores';
import { Menu } from 'antd';
import { createStyles } from 'antd-style';
import { shallow } from 'zustand/shallow';
import useMenuState from './useMenuState';

const useMenuStyles = createStyles({
  menu: {
    width: '100%',
    height: '100%',
    maxHeight: 'calc(100vh - 55px)',
    overflow: 'hidden auto',
  },
});

const LayoutMenu: React.FC = () => {
  const { styles } = useMenuStyles();
  const { menus, selectKey, openKeys, onClickMenuItem, onOpenKeys } = useMenuState();
  const { menuTheme, layoutMode } = useAllStores(
    (state) => ({
      menuTheme: state.menuTheme,
      layoutMode: state.layoutMode,
    }),
    shallow,
  );

  return (
    <Menu
      className={layoutMode === 'sider' ? styles.menu : 'w-full flex-1'}
      mode={layoutMode === 'sider' ? 'inline' : 'horizontal'}
      theme={layoutMode === 'top' ? 'light' : menuTheme}
      items={menus}
      selectedKeys={[selectKey]}
      openKeys={openKeys}
      onClick={onClickMenuItem}
      onOpenChange={onOpenKeys}
    />
  );
};

export default LayoutMenu;
