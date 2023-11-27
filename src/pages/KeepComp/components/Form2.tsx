import { message } from '@/hooks/useAppStatic';
import {
  BetaSchemaForm,
  ProCard,
  ProForm,
  type ProFormColumnsType,
} from '@ant-design/pro-components';
import { useToggle } from 'ahooks';
import { Button, Tooltip, Typography } from 'antd';

const { Paragraph, Text, Link } = Typography;

type DataItem = {
  name: string;
  state: string;
  title: string;
};

const columns2: ProFormColumnsType<DataItem>[] = [
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'createName',
    valueType: 'date',
  },
  {
    title: '分组',
    valueType: 'group',
    columns: [
      {
        title: '状态',
        dataIndex: 'groupState',
        valueType: 'select',
        width: 'xs',
        valueEnum: {
          all: { text: '全部', status: 'Default' },
          open: { text: '未解决', status: 'Error' },
          closed: { text: '已解决', status: 'Success', disabled: true },
          processing: { text: '解决中', status: 'Processing' },
        },
      },
      {
        title: '标题',
        width: 'md',
        dataIndex: 'groupTitle',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
      },
    ],
  },
];

const Form2 = () => {
  const [state, { toggle }] = useToggle();
  return (
    <ProForm onFinish={async (value) => message.info(JSON.stringify(value))}>
      <ProCard title="测试Tooltip" bordered>
        {!state ? (
          <>
            <Typography>
              <Paragraph>
                查看是否有类似组件库 <Text keyboard>react-activation</Text> 的 bug。
                <Text keyboard>react-activation</Text> 在组件切换时。若点击项有 Tooltip，点击时由于
                <Text strong>缺少鼠标移出区域的动作</Text>，会导致组件虽然切换，但 Tooltip
                不会消失，该问题至今未修复。详情可查看
                <Link href="https://github.com/CJY0208/react-activation/issues/240">官方issue</Link>
              </Paragraph>
            </Typography>
            <Tooltip title="测试">
              <Button type="primary" onClick={toggle}>
                ToolTip按钮
              </Button>
            </Tooltip>
          </>
        ) : (
          <Button onClick={toggle}>切回来</Button>
        )}
      </ProCard>

      <BetaSchemaForm<DataItem> layoutType="Embed" columns={columns2} />
    </ProForm>
  );
};

export default Form2;
