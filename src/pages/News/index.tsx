import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, message, Typography } from 'antd';
import { News } from '@/models/news';
import { PlusOutlined } from '@ant-design/icons';
import * as service from './service';
import Details from './components/DetailsComp';
import ModalForm from './components/ModalForm';
import CreateForm from './components/CreateForm';
import ModifyForm from './components/ModifyForm';

const entityTypeName = '新闻列表';

type Entity = News;

const entityApiService = {
  deleteEntity: service.deletedNews,
  deleteEntities: service.deletedNewss,
  queryEntities: service.queryNewss,
  queryEntitie: service.queryNews,
};

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [dataSource, setDataSource] = useState<Entity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [creactModalVisible, setCreactModalVisible] = useState<boolean>(false);
  const [detailEntity, setDetailEntity] = useState<Entity | null>();
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [modifyEntity, setModifyEntity] = useState<Entity | null>();
  const [modifyModalVisible, setModifyModalVisible] = useState<boolean>(false);

  const loadData = () => {
    setLoading(true);
    entityApiService.queryEntities().then((res: any) => {
      if (res.code === 200) {
        setDataSource(res.data.list);
        setLoading(false);
      }
    });
  };

  const columns: ProColumns<Entity>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      fixed: 'right',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record: Entity) => (
        <>
          <a
            onClick={() => {
              entityApiService.queryEntitie(record._id).then((res) => {
                if (res.code === 200) {
                  setDetailModalVisible(true);
                  setDetailEntity(res.data);
                }
              });
            }}
          >
            详情
          </a>

          <>
            <Divider type="vertical" />
            <a
              onClick={() => {
                setModifyModalVisible(true);
                setModifyEntity(record);
              }}
            >
              编辑
            </a>
          </>

          <>
            <Divider type="vertical" />
            <a
              onClick={() => {
                entityApiService.deleteEntity(record._id).then((res) => {
                  if (res.code === 200) {
                    message.info('删除成功');
                    loadData();
                  }
                });
              }}
            >
              <Typography.Text type="danger">删除</Typography.Text>
            </a>
          </>
        </>
      ),
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title={false}>
      <ProTable<Entity>
        headerTitle={`${entityTypeName}`}
        actionRef={actionRef}
        rowKey="_id"
        search={{
          labelWidth: 'auto',
        }}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setCreactModalVisible(true)}
          >
            新建
          </Button>,
        ]}
      />
      <ModalForm
        modalTitle={`查看${entityTypeName}详情`}
        modalVisible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        modalWidth={640}
      >
        <Details data={detailEntity} />
      </ModalForm>

      <ModalForm
        modalWidth={840}
        modalVisible={creactModalVisible}
        onCancel={() => setCreactModalVisible(false)}
        modalTitle={`新建${entityTypeName}`}
      >
        <CreateForm
          onSubmitted={() => {
            setCreactModalVisible(false);
            loadData();
          }}
        />
      </ModalForm>
      <ModalForm
        modalWidth={840}
        modalVisible={modifyModalVisible}
        onCancel={() => setModifyModalVisible(false)}
        modalTitle={`编辑${entityTypeName}`}
      >
        {modifyEntity && (
          <ModifyForm
            onSubmitted={() => {
              setModifyModalVisible(false);
              loadData();
            }}
            bizId={modifyEntity?._id!}
          />
        )}
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
