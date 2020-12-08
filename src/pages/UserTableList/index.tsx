import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DrawerCom from '@/components/Drawer';
import { addUser, queryUsers, removeUser, UpdateUser } from './service';
import { UpdateUserForm } from './components/UpdateUserForm';

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowId, setRowId] = useState<string>('');

  const [drawerComVisible, setDrawerComVisible] = useState<boolean>(false);
  const [updateDrawerComVisible, setUpdateDrawerComVisible] = useState<boolean>(false);

  const loadData = () => {
    setLoading(true);
    queryUsers().then((res) => {
      if (res.code === 200) {
        setLoading(false);
        setData(res?.data?.list);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns: any = [
    {
      title: '用户名称',
      dataIndex: 'account',
      copyable: true,
      ellipsis: true,
      width: 200,
      hideInSearch: true,
      fixed: 'left',
    },
    {
      title: '密码',
      dataIndex: 'password',
      copyable: true,
      ellipsis: true,
      width: 200,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 200,
      render: (text: any, row: any, _: any, action: any) => [
        <a
          onClick={() => {
            const { id } = row;
            if (id) {
              setUpdateDrawerComVisible(true);
              setRowId(id);
            }
          }}
        >
          编辑
        </a>,
        <a
          onClick={() => {
            const { id } = row;
            if (id) {
              removeUser(id).then((res) => {
                if (res.code === 200) {
                  action.reload();
                  loadData();
                }
              });
            }
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const handleClick = () => {
    setDrawerComVisible(true);
  };

  return (
    <PageContainer title={false}>
      <ProTable<any>
        loading={loading}
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        dataSource={data}
        columns={columns}
        toolBarRender={() => [
          <Button key="3" type="primary" onClick={handleClick}>
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />

      <DrawerCom
        visible={drawerComVisible}
        onClose={() => setDrawerComVisible(false)}
        drawerHeaderName="新增用户"
      >
        <ProTable<any>
          rowKey="key"
          type="form"
          columns={columns}
          onSubmit={async (value) => {
            const res = await addUser(value);
            if (res.code === 200) {
              setDrawerComVisible(false);
              loadData();
            }
          }}
        />
      </DrawerCom>

      {rowId && (
        <DrawerCom
          visible={updateDrawerComVisible}
          onClose={() => setUpdateDrawerComVisible(false)}
          drawerHeaderName="编辑用户"
        >
          <UpdateUserForm
            rowId={rowId}
            onSubmit={async (value: any) => {
              const res = await UpdateUser({ ...value, id: rowId });
              if (res.code === 200) {
                setUpdateDrawerComVisible(false);
                setRowId('');
                loadData();
              }
            }}
          />
        </DrawerCom>
      )}
    </PageContainer>
  );
};

export default TableList;
