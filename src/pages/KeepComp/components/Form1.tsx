import { message } from '@/hooks/useAppStatic';
import { BetaSchemaForm, ProForm, type ProFormColumnsType } from '@ant-design/pro-components';

type DataItem = {
  name: string;
  state: string;
  title: string;
};

const columns1: ProFormColumnsType<DataItem>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    formItemProps: {
      rules: [{ required: true, message: '此项为必填项' }],
    },
    width: 'm',
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: { text: '未解决', status: 'Error' },
      closed: { text: '已解决', status: 'Success', disabled: true },
      processing: { text: '解决中', status: 'Processing' },
    },
    width: 'm',
  },
];
const Form1 = () => (
  <ProForm onFinish={async (value) => message.info(JSON.stringify(value))}>
    <BetaSchemaForm<DataItem> layoutType="Embed" columns={columns1} />
  </ProForm>
);

export default Form1;
