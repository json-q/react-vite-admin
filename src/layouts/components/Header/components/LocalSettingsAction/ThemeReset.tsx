import useAllStores from '@/stores';
import { RedoOutlined } from '@ant-design/icons';
import { Button } from 'antd/lib';

const ThemeReset: React.FC = () => {
  const resetSettings = useAllStores((state) => state.resetSettings);

  return <Button type="primary" size="small" icon={<RedoOutlined />} onClick={resetSettings} />;
};

export default ThemeReset;
