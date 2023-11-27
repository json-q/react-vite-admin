import useAllStores from '@/stores';
import { Switch } from 'antd';
import { shallow } from 'zustand/shallow';

// 菜单主题切换控件
export const MenuThemeModeSwitch: React.FC = () => {
  const { menuTheme, actionMenuTheme, layoutMode } = useAllStores(
    (state) => ({
      menuTheme: state.menuTheme,
      layoutMode: state.layoutMode,
      actionMenuTheme: state.actionMenuTheme,
    }),
    shallow,
  );

  return (
    <Switch
      checked={menuTheme === 'dark'}
      checkedChildren="暗"
      unCheckedChildren="亮"
      disabled={layoutMode === 'top'}
      onChange={(checked) => actionMenuTheme(checked ? 'dark' : 'light')}
    />
  );
};
