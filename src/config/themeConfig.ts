import type { ThemeConfig } from 'antd';

export const themeColors = [
  { color: '#1677ff', tip: '科技蓝（默认）' },
  { color: '#1890ff', tip: '拂晓' },
  { color: '#f1212c', tip: '薄暮' },
  { color: '#f7531c', tip: '火山' },
  { color: '#f7ab14', tip: '日暮' },
  { color: '#13bdbd', tip: '明青' },
  { color: '#51c11a', tip: '激光绿' },
  { color: '#2f54eb', tip: '极客蓝' },
  { color: '#722ed1', tip: '酱紫' },
];

export const overridesTheme: ThemeConfig = {
  components: {
    Layout: { headerHeight: 55 },
  },
};
