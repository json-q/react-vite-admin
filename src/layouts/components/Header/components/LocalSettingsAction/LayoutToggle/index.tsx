import useAllStores from '@/stores';
import { CheckOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { shallow } from 'zustand/shallow';
import useLayoutToggleStyles from './styles';

const SelectedMark: React.FC<{ selected: boolean }> = ({ selected }) => {
  const { styles } = useLayoutToggleStyles();

  if (!selected) return null;
  return (
    <span className={styles.selectedContainer}>
      <CheckOutlined className={styles.selectedIcon} />
    </span>
  );
};

interface LayoutShapeItemProps {
  type: 'sider' | 'top';
  layoutMode: 'sider' | 'top';
  onSelected: () => void;
}

const LayoutShapeItem: React.FC<LayoutShapeItemProps> = ({ type, layoutMode, onSelected }) => {
  const { styles } = useLayoutToggleStyles({ type });

  return (
    <Tooltip title={type === 'sider' ? '侧边菜单布局' : '顶部菜单布局'}>
      <div className={styles.container} onClick={onSelected}>
        {type === 'sider' && <span className={styles.siderContainer} />}
        <span className={styles.topContainer} />
        <SelectedMark selected={layoutMode === type} />
      </div>
    </Tooltip>
  );
};

const LayoutToggle: React.FC = () => {
  const { layoutMode, actionLayoutMode, actionWidthFixed } = useAllStores(
    (state) => ({
      layoutMode: state.layoutMode,
      actionLayoutMode: state.actionLayoutMode,
      actionWidthFixed: state.actionWidthFixed,
    }),
    shallow,
  );

  return (
    <Space>
      <LayoutShapeItem
        layoutMode={layoutMode}
        type="sider"
        onSelected={() => {
          actionLayoutMode('sider');
          actionWidthFixed(false);
        }}
      />
      <LayoutShapeItem
        layoutMode={layoutMode}
        type="top"
        onSelected={() => actionLayoutMode('top')}
      />
    </Space>
  );
};

export default LayoutToggle;
