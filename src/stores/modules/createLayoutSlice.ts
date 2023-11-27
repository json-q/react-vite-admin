import type { StateCreator } from 'zustand';

export type GlobalThemeMode = 'light' | 'dark';
export type SizeModeType = 'default' | 'small';

/** 全局主题切换可以使用 antd-style 自带的 useThemeMode ，这里为了统一管理，手动对主题状态进行管理
 * 可以独立控制菜单的主题色，不再直接依赖内部实现的全局主题色切换，自定义程度更高。但全局主题色优先级更高
 */
export type LayoutSliceType = {
  openSetting: boolean;
  collapsed: boolean;
  colorPrimary: string;
  menuTheme: GlobalThemeMode;
  themeMode: GlobalThemeMode;
  layoutMode: 'sider' | 'top';
  widthFixed: boolean;
  sizeMode: SizeModeType;
  actionOpenSetting: (visible: boolean) => void;
  actionCollapsed: (collapsed: boolean) => void;
  actionColorPrimary: (color: string) => void;
  actionMenuTheme: (menuTheme: GlobalThemeMode) => void;
  actionThemeMode: (themeMode: GlobalThemeMode) => void;
  actionLayoutMode: (layoutMode: 'sider' | 'top') => void;
  actionWidthFixed: (widthFixed: boolean) => void;
  actionSizeMode: (sizeMode: SizeModeType) => void;
  resetSettings: () => void;
};

// TS 切片用法参考 zustand 官网：https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern

const createLayoutSlice: StateCreator<LayoutSliceType> = (set, get) => ({
  openSetting: false,
  collapsed: false,
  colorPrimary: '#1677ff',
  menuTheme: 'light',
  themeMode: 'light',
  layoutMode: 'sider',
  widthFixed: false,
  sizeMode: 'default',
  actionOpenSetting: (openSetting) => set(() => ({ openSetting })),
  actionCollapsed: (collapsed) => set(() => ({ collapsed })),
  actionColorPrimary: (color) => set(() => ({ colorPrimary: color })),
  actionMenuTheme: (menuTheme) => set(() => ({ menuTheme })),
  actionThemeMode: (themeMode) => {
    // 顶部菜单不允许修改颜色，默认为亮色
    const menuTheme = get().layoutMode === 'top' ? 'light' : themeMode;
    set({ themeMode, menuTheme });
  },
  actionLayoutMode: (layoutMode) => {
    const menuTheme = layoutMode === 'top' ? 'light' : get().menuTheme;
    set({ layoutMode, menuTheme });
  },
  actionWidthFixed: (widthFixed) => set(() => ({ widthFixed })),
  actionSizeMode: (sizeMode) => set(() => ({ sizeMode })),
  resetSettings: () =>
    set(() => ({
      colorPrimary: '#1677ff',
      menuTheme: 'light',
      themeMode: 'light',
      layoutMode: 'sider',
      widthFixed: false,
      sizeMode: 'default',
    })),
});
export default createLayoutSlice;
