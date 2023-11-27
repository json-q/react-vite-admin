import type { ThemeConfig } from 'antd';
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import { ThemeProvider } from 'antd-style';
import 'antd/dist/reset.css';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import App from './App';
import ErrorBrowser from './components/ErrorBrowser';
import { overridesTheme } from './config/themeConfig';
import useAllStores from './stores';
import './styles/index.css';

import supportBrowser from './utils/supportBrowser';
dayjs.locale('zh-cn');

const Main: React.FC = () => {
  const { themeMode, colorPrimary, sizeMode } = useAllStores(
    (state) => ({
      themeMode: state.themeMode,
      colorPrimary: state.colorPrimary,
      sizeMode: state.sizeMode,
    }),
    shallow,
  );

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const mixinTheme: ThemeConfig = {
    ...overridesTheme,
    ...{
      token: {
        colorPrimary,
      },
      algorithm: sizeMode === 'default' ? undefined : theme.compactAlgorithm,
    },
  };

  if (!supportBrowser()) return <ErrorBrowser />;

  return (
    <ThemeProvider appearance={themeMode} theme={mixinTheme}>
      <ConfigProvider locale={zhCN}>
        <AntdApp>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AntdApp>
      </ConfigProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
