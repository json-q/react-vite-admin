import useMemoKeepAliveScroll from '@/hooks/useMemoKeepAliveScroll';
import { Button, Card, Divider, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const domRef = useRef(null);
  const [randomNum, setRandomNum] = useState(110);
  useMemoKeepAliveScroll(domRef);

  const List = (len: number) => [...new Array(len).keys()];

  return (
    <div ref={domRef}>
      <Card title="测试不显示在菜单的路由">
        <Button type="primary" onClick={() => navigate('/test/t2')}>
          跳转至菜单隐藏页面
        </Button>
      </Card>
      <Divider />
      <Card title="测试跳转动态路由页面">
        <Space>
          <Button onClick={() => setRandomNum(Math.floor(Math.random() * (1000 + 1)))}>
            生成随机参数id：
          </Button>
          <Button type="primary" onClick={() => navigate(`/dynamic-router/${randomNum}`)}>
            跳转至动态路由
          </Button>
        </Space>
        <div>id参数：{randomNum}</div>
      </Card>
      <Divider />
      <Card title="测试两侧滑动 内部菜单所有页面默认全部缓存，可进行配置页面是否缓存">
        <h3 className="text-rose-700">该页面可缓存滚动高度</h3>
        {List(100).map((v) => {
          return <p key={v}>长列表第{v}项</p>;
        })}
      </Card>
    </div>
  );
};

export default Home;
