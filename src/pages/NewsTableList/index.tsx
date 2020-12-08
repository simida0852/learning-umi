import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';

import { queryNews } from './service';

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();

  const [data, setData] = useState([]);

  const columns: any = [
    {
      title: '标题',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      width: 200,
      hideInSearch: true,
    },
  ];

  useEffect(() => {
    queryNews().then((res) => {
      setData(res?.data);
    });
  }, []);

  return (
    <PageContainer title={false}>
      <ProTable<any>
        headerTitle="新闻列表"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        dataSource={data}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
