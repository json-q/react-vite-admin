import useMemoKeepAliveScroll from '@/hooks/useMemoKeepAliveScroll';
import React, { useRef } from 'react';

const Home: React.FC = () => {
  const domRef = useRef(null);
  useMemoKeepAliveScroll(domRef);

  const List = (len: number) => [...new Array(len).keys()];

  return (
    <div ref={domRef}>
      <h2>Home 测试两侧滑动 内部菜单所有页面默认全部缓存，可进行配置页面是否缓存</h2>
      <h3 className="text-rose-700">该页面可缓存滚动高度</h3>
      {List(100).map((v) => {
        return <p key={v}>长列表第{v}项</p>;
      })}
    </div>
  );
};

export default Home;
