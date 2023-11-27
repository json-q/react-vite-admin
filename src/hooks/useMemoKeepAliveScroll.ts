import { useThrottleFn } from 'ahooks';
import { useOnActiveByRef } from 'keepalive-for-react';
import { useRef } from 'react';

const useMemoKeepAliveScroll = (ref: React.RefObject<HTMLDivElement>) => {
  const hTop = useRef(0);

  const getTargetDom = () => document.querySelector('.cache-component') as HTMLDivElement;

  const onScroll = () => {
    const targetDom = getTargetDom();
    hTop.current = targetDom?.scrollTop || 0;
    console.log(targetDom?.scrollTop);
  };

  const { run } = useThrottleFn(onScroll, { wait: 500 });

  useOnActiveByRef(
    ref,
    () => {
      const targetDom = getTargetDom();
      targetDom?.scrollTo(0, hTop.current);
      targetDom?.addEventListener('scroll', run);
      return () => {
        targetDom?.removeEventListener('scroll', run);
      };
    },
    false,
  );
};

export default useMemoKeepAliveScroll;
