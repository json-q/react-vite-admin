import { useCounter } from 'ahooks';
import { Button, Space } from 'antd';
import { useLocation } from 'react-router';

const Test: React.FC = () => {
  const { pathname } = useLocation();
  const [current, { inc, dec, set, reset }] = useCounter(5, { min: 1, max: 10 });

  return (
    <div>
      <h1>
        当前页面： {pathname} {pathname === '/test/t1' && '该页面不会缓存'}
      </h1>
      <p>{current} [max: 10; min: 1;]</p>
      <Space>
        <Button onClick={() => inc()}>inc()</Button>
        <Button onClick={() => dec()}>dec()</Button>
        <Button onClick={() => set(3)}>set(3)</Button>
        <Button onClick={() => reset()}>reset()</Button>
      </Space>
    </div>
  );
};

export default Test;
