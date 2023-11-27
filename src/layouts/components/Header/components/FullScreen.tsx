import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
import { Button, Tooltip } from 'antd';

const FullScreen: React.FC = () => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(() => document.querySelector('html'));
  return (
    <Tooltip placement="bottom" title={isFullscreen ? '退出全屏' : '进入全屏'}>
      <Button
        type="text"
        icon={!isFullscreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
        onClick={toggleFullscreen}
      />
    </Tooltip>
  );
};

export default FullScreen;
