import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotAuth: React.FC = () => {
  const navigate = useNavigate();

  const backHome = () => navigate('/');

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Button type="primary" onClick={backHome}>
            返回首页
          </Button>
        }
      />
    </div>
  );
};

export default NotAuth;
