/* eslint-disable no-underscore-dangle */
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Drawer, Typography } from 'antd';
import { NewsItem } from './data.d';
import { queryNew, queryNews } from './service';

const { Title, Paragraph } = Typography;

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<NewsItem>();

  const columns: ProColumns<NewsItem>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      width: 200,
      hideInSearch: true,
      render: (dom, entity: any) => {
        return (
          <a
            onClick={() => {
              queryNew(entity?._id);
              setRow(entity);
            }}
          >
            {dom}
          </a>
        );
      },
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<NewsItem>
        headerTitle="新闻列表"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        columns={columns}
        request={(params) => queryNews({ ...params })}
      />

      <Drawer
        width={1000}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.title && (
          <Typography>
            <Title level={4}>{row.title}</Title>
            <Paragraph>{row.title}</Paragraph>
          </Typography>
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
