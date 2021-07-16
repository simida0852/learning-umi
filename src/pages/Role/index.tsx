/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DrawerCom from '@/components/Drawer';
import { RoleItem } from './data';
import { queryRole, queryRoles } from './service';
import { UpdateUserForm } from '../UserList/components/UpdateUserForm';
import { addUser, UpdateUser } from '../UserList/service';

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [rowId, setRowId] = useState<string>('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [drawerComVisible, setDrawerComVisible] = useState<boolean>(false);
  const [updateDrawerComVisible, setUpdateDrawerComVisible] = useState<boolean>(false);

  const columns: ProColumns<RoleItem>[] = [
    {
      title: '角色名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 200,
      hideInSearch: true,
      render: (dom, entity: any) => {
        return (
          <a
            onClick={() => {
              const { id } = entity;
              if (id) {
                setUpdateDrawerComVisible(true);
                queryRole(entity?._id);
                setRowId(id);
              }
            }}
          >
            {dom}
          </a>
        );
      },
    },
  ];

  const loadData = () => {
    setLoading(true);
    queryRoles().then((res) => {
      if (res.code === 200) {
        setLoading(false);
        setData(res?.data?.list);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title={false}>
      <ProTable<RoleItem>
        loading={loading}
        headerTitle="角色列表"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        dataSource={data}
        columns={columns}
        toolBarRender={() => [
          <Button key="1" type="primary" onClick={() => setDrawerComVisible(true)}>
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
