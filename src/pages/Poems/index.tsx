import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { Poems } from '@/models/poems';
import * as service from './service';
import Details from './components/DetailsComp';
import ModalForm from './components/ModalForm';

const entityTypeName = '诗词列表';

type Entity = Poems;

const entityApiService = {
  deleteEntity: service.deletedPoems,
  deleteEntities: service.deletedPoemss,
  queryEntities: service.queryPoemss,
  queryEntitie: service.queryPoems,
};

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [dataSource, setDataSource] = useState<Entity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [detailEntity, setDetailEntity] = useState<Entity | null>();
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);

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
      dataIndex: 'p_name',
      ellipsis: true,
      hideInSearch: true,
      renderText: (text, record) => {
        return `${record?.p_name}-${record?.p_author}`;
      },
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
              entityApiService.queryEntitie(record?._id).then((res) => {
                if (res.code === 200) {
                  setDetailModalVisible(true);
                  setDetailEntity(res.data);
                }
              });
            }}
          >
            查看
          </a>
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
        toolBarRender={false}
      />
      <ModalForm
        modalTitle={`查看${entityTypeName}详情`}
        modalVisible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        modalWidth={640}
      >
        <Details data={detailEntity!} />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
