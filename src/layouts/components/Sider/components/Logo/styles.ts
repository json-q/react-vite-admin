import type { MenuTheme } from 'antd';
import { createStyles } from 'antd-style';

interface Theme {
  menuTheme: MenuTheme;
  themeMode: MenuTheme;
}
type LogoBg = string;
type H1Color = string;
type MatchColorType = [LogoBg, H1Color];

/**
 * - menu白 主题黑：bg黑               color白
 * - menu白 主题白：bg白               color黑
 * - menu黑 主题黑：bg暗               color白
 * - menu黑 主题白：bg暗               color白
 */

const darkBgColor = '#001529',
  blackBgColor = '#141414',
  darkTextColor = 'rgb(255, 255, 255, 0.85)',
  blackTextColor = 'rgb(0, 0, 0, 0.88)';
const matchColor = ({ menuTheme, themeMode }: Theme): MatchColorType => {
  if (menuTheme === 'light' && themeMode === 'dark') return [blackBgColor, darkTextColor];
  if (menuTheme === 'light' && themeMode === 'light') return ['#ffffff', blackTextColor];
  return [darkBgColor, darkTextColor];
};

export default createStyles(({ token, css }, props: Theme) => ({
  logo: css`
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    line-height: 55px;
    padding: 16px 12px;
    cursor: pointer;
    background-color: ${matchColor(props)[0]};
    border-bottom: 1px solid
      ${props.menuTheme === 'dark' ? 'transparent' : token.colorBorderSecondary};

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 22px;
      font-size: 22px;

      > img {
        height: 22px;
        vertical-align: middle;
      }

      > h1 {
        height: 22px;
        margin: 0;
        color: ${matchColor(props)[1]};
        font-weight: 600;
        font-size: ${token.fontSizeLG}px;
        line-height: ${token.lineHeightLG}em;
        white-space: nowrap;
        vertical-align: middle;
        animation: logo-title-animation 0.4s ease;
        margin-inline: 6px 0;

        @keyframes logo-title-animation {
          0% {
            display: none;
            overflow: hidden;
            opacity: 0;
          }
          80% {
            overflow: hidden;
          }
          100% {
            display: unset;
            opacity: 1;
          }
        }
      }
    }
  `,
}));
