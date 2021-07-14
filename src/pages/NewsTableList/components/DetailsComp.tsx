import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export interface DetailsCompProps {
  data: any;
}

const DetailsComp: React.FC<DetailsCompProps> = (props) => {
  const { data } = props;

  return (
    <Typography>
      <Title level={5}>{data?.title}</Title>
      <Paragraph>{data?.content}</Paragraph>
    </Typography>
  );
};

export default DetailsComp;
