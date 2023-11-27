import useAllStores from '@/stores';
import { Select } from 'antd';
import { shallow } from 'zustand/shallow';

const WidthFixed: React.FC = () => {
  const { layoutMode, widthFixed, actionWidthFixed } = useAllStores(
    (state) => ({
      layoutMode: state.layoutMode,
      widthFixed: state.widthFixed,
      actionWidthFixed: state.actionWidthFixed,
    }),
    shallow,
  );

  return (
    <Select
      className="w-[80px]"
      size="small"
      disabled={layoutMode === 'sider'}
      onChange={(value) => actionWidthFixed(value === 'fixed')}
      value={widthFixed ? 'fixed' : 'flex'}
      options={[
        { value: 'flex', label: '流式' },
        { value: 'fixed', label: '定宽' },
      ]}
    />
  );
};

export default WidthFixed;
