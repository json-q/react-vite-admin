import { ProCard } from '@ant-design/pro-components';
import { useToggle } from 'ahooks';
import { Button } from 'antd';
import KeepAlive from 'keepalive-for-react';
import Form1 from './components/Form1';
import Form2 from './components/Form2';

const KeepComp: React.FC = () => {
  const [state, { toggle }] = useToggle('Form1', 'Form2');

  // 最外层 Card 尽量不要设置 h100% ，由内容撑开最好，不然会导致内部的内容样式在高度不足的情况下显示异常
  return (
    <ProCard
      title="组件级别的缓存使用"
      extra="尝试添加内容然后切换组件"
      bordered
      headerBordered
      split="vertical"
    >
      <ProCard className="h-full" title="操作" colSpan="20%">
        <Button onClick={toggle}>切换Form</Button>
      </ProCard>
      <ProCard className="h-full" title={`当前组件：${state}`}>
        {/* 组件全部缓存，若某个组件不缓存可设置 false */}
        <KeepAlive activeName={state} cache>
          {state === 'Form1' ? <Form1 /> : <Form2 />}
        </KeepAlive>
      </ProCard>
    </ProCard>
  );
};

export default KeepComp;
