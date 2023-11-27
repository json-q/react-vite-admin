import useAllStores from '@/stores';
import type { SizeModeType } from '@/stores/modules/createLayoutSlice';
import { CompressOutlined, ExpandOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import { shallow } from 'zustand/shallow';

const SizeModeSwitch: React.FC = () => {
  const { sizeMode, actionSizeMode } = useAllStores(
    (state) => ({
      sizeMode: state.sizeMode,
      actionSizeMode: state.actionSizeMode,
    }),
    shallow,
  );

  return (
    <Segmented
      value={sizeMode}
      options={[
        { value: 'default', icon: <ExpandOutlined /> },
        { value: 'small', icon: <CompressOutlined /> },
      ]}
      onChange={(value) => actionSizeMode(value as SizeModeType)}
    />
  );
};

export default SizeModeSwitch;
