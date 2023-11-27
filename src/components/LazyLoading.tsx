import { LoadingOutlined } from '@ant-design/icons';
import { Col, Row, Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface LoadingParams {
  height?: string | number;
}

const LazyLoading = ({ height }: LoadingParams) => {
  return (
    <Row align="middle" justify="center" style={{ height: height || '100vh' }}>
      <Col className="w-full">
        <Spin indicator={antIcon} tip="加载中...">
          {/* antd 5.5 之后 Spin 必须有子元素才能使用 tip。React.Fragment，避免无意义渲染，仅占位 */}
          <></>
        </Spin>
      </Col>
    </Row>
  );
};

export default LazyLoading;
