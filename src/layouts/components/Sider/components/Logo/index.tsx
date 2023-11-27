import useAllStores from '@/stores';
import { Link } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import useLogoStyles from './styles';

const LayoutLogo: React.FC = () => {
  const { menuTheme, themeMode, collapsed } = useAllStores(
    (state) => ({
      menuTheme: state.menuTheme,
      themeMode: state.themeMode,
      collapsed: state.collapsed,
    }),
    shallow,
  );
  const { styles } = useLogoStyles({ menuTheme, themeMode });

  return (
    <div className={styles.logo}>
      <Link to="/">
        <img
          width="auto"
          height="22"
          src="https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg"
          alt="logo"
        />
        {collapsed ? null : <h1>{import.meta.env.VITE_APP_TITLE}</h1>}
      </Link>
    </div>
  );
};

export default LayoutLogo;
