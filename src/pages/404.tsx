import { Button, Col, Result, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

const NoFound: React.FC = () => {
  const navigate = useNavigate();

  const backPrev = () => navigate(-1);
  const backHome = () => navigate('/');

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Row gutter={50} justify="center">
            <Col>
              <Button type="primary" onClick={backPrev}>
                返回上一页
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={backHome}>
                返回首页
              </Button>
            </Col>
          </Row>
        }
      />
    </div>
  );
};

export default NoFound;
