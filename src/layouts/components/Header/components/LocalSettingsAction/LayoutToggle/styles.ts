import { createStyles } from 'antd-style';

export default createStyles(({ css, token }, props: { type?: 'sider' | 'top' }) => ({
  container: css`
    position: relative;
    box-sizing: border-box;
    width: 58px;
    height: 48px;
    overflow: hidden;
    background-color: #f0f2f5;
    cursor: pointer;
    border-radius: 6px;
    border: 1px solid ${token.colorBorder};
    box-shadow: ${token.boxShadow};
  `,
  siderContainer: css`
    position: absolute;
    width: 18px;
    height: 100%;
    background-color: #001529;
    z-index: 2;
  `,
  topContainer: css`
    position: absolute;
    width: 100%;
    height: 10px;
    background-color: ${props?.type === 'sider' ? '#fff' : '#001529'};
    z-index: 1;
  `,
  selectedContainer: css`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 24px;
    height: 24px;
    background-image: linear-gradient(
      -45deg,
      ${token.colorPrimary} 50%,
      rgba(255, 255, 255, 0) 50%
    );
  `,
  selectedIcon: css`
    position: absolute;
    bottom: 0;
    right: 1px;
    font-size: 12px;
    color: #fff;
  `,
}));
