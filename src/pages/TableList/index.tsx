import { addData, delData, getList, modifyData } from '@/apis/mock';
import type { Mock } from '@/apis/mock/typings';
import { message } from '@/hooks/useAppStatic';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Modal, Popconfirm, Space } from 'antd';
import React, { useRef, useState } from 'react';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchTableList = async (params: Pagination) => {
    const { data, code } = await getList(params);
    return {
      data: data?.list || [],
      success: code === 200,
      total: data?.total || 0,
    };
  };

  const addSubmit = async (values: IAnyObject) => {
    const loading = message.loading('正在添加');
    const { code } = await addData(values);
    loading();
    if (code !== 200) return false;
    message.success('添加成功');
    actionRef.current?.reloadAndRest?.();
    return true;
  };

  const updateSubmit = async (id: string, values: IAnyObject) => {
    const loading = message.loading('正在更新');
    const { code } = await modifyData(id, values);
    loading();
    if (code !== 200) return false;
    message.success('更新成功');
    actionRef.current?.reloadAndRest?.();
    return true;
  };

  const BantchDel = async () => {
    const loading = message.loading('正在删除');
    const { code } = await delData(selectedRowsKeys.join());
    loading();
    if (code === 200) message.success('删除成功');
    setSelectedRowKeys([]);
    actionRef.current?.reloadAndRest?.();
  };

  const columns: ProColumns<Mock.TableListType>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '编号',
      dataIndex: 'id',
      copyable: true,
      ellipsis: true,
      formItemProps: {
        rules: [{ required: true, message: '此项为必填项' }],
      },
    },
    {
      title: '名字',
      dataIndex: 'name',
      width: 80,
    },
    {
      title: '描述',
      dataIndex: 'description',
      copyable: true,
      ellipsis: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      ellipsis: true,
    },
    {
      title: '县镇',
      dataIndex: 'county',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '邮政编码',
      dataIndex: 'zip',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        运行中: { text: '运行中', status: 'Processing' },
        关闭: { text: '关闭', status: 'Success' },
        异常: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_text, record, _, action) => [
        <a key="look" onClick={() => message.success('click record')}>
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={async (key) => {
            if (key === 'editable') action?.startEditable?.(record.id);
            else message.success(`click key:${record.id}`);
          }}
          menus={[
            { key: 'editable', name: '编辑' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];

  return (
    <>
      <ProTable<Mock.TableListType>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          return fetchTableList(params);
        }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 10 }}
        tableAlertRender={({ selectedRowKeys }) => <span>已选 {selectedRowKeys.length} 项</span>}
        tableAlertOptionRender={({ onCleanSelected }) => {
          return (
            <Space size={16}>
              <a onClick={onCleanSelected}>取消选择</a>
              <Popconfirm title="提示" description="确定要删除该数据?" onConfirm={BantchDel}>
                <a style={{ color: 'red' }}>批量删除</a>
              </Popconfirm>
            </Space>
          );
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        editable={{
          type: 'multiple',
          onSave: async (key, record) => {
            await updateSubmit(key as string, record);
          },
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={{ labelWidth: 80 }}
        rowSelection={{
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
      />
      <Modal
        destroyOnClose
        title="新建"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <ProTable
          onSubmit={async (value) => {
            const success = await addSubmit(value);
            if (success) setModalVisible(false);
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </Modal>
    </>
  );
};

export default TableList;
