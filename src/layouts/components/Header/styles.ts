import { createStyles } from 'antd-style';

export default createStyles(({ css, token }) => ({
  header: css`
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 0 16px;
    background-color: ${token.colorBgContainer};
    border-bottom: 1px solid ${token.colorBorderSecondary};
    backdrop-filter: blur(8px);
  `,
}));
