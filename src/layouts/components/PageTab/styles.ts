import { createStyles } from 'antd-style';

export default createStyles(({ css, token }) => ({
  tab: css`
    position: sticky;
    top: 55px;
    z-index: 100;
    background-color: ${token.colorBgLayout};
    backdrop-filter: blur(8px);
  `,
}));
