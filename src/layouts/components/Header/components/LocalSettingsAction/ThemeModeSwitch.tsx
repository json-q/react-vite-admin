import DarkIcon from '@/assets/icons/DarkSvg';
import LightIcon from '@/assets/icons/LightSvg';
import useAllStores from '@/stores';
import type { GlobalThemeMode } from '@/stores/modules/createLayoutSlice';
import { Segmented } from 'antd';
import { shallow } from 'zustand/shallow';

// 全局主题切换控件
const ThemeModeSwitch: React.FC = () => {
  const { themeMode, actionThemeMode } = useAllStores(
    (state) => ({
      themeMode: state.themeMode,
      actionThemeMode: state.actionThemeMode,
    }),
    shallow,
  );

  return (
    <Segmented
      value={themeMode}
      options={[
        { value: 'light', icon: <LightIcon /> },
        { value: 'dark', icon: <DarkIcon /> },
      ]}
      onChange={(value) => actionThemeMode(value as GlobalThemeMode)}
    />
  );
};

export default ThemeModeSwitch;
