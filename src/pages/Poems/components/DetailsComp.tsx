import React from 'react';
import type { Poems } from '@/models/poems';
import './DetailsComp.less';
import { Image } from 'antd';

export interface DetailsCompProps {
  data: Poems;
}

const DetailsComp: React.FC<DetailsCompProps> = (props) => {
  const { data } = props;

  const content = data?.p_content
    .replace(/\s+/g, '')
    ?.split('。')
    ?.filter((f) => f);

  return (
    <div className="container">
      <div>{data?.p_img_url && <Image width="600" src={data.p_img_url as string} />}</div>
      <div className="title">{data.p_name}</div>
      <div className="author">
        {data?.p_dynasty}·{data?.p_author}
      </div>
      <div className="content">
        {content?.map((v) => (
          <p>{v}。</p>
        ))}
      </div>
    </div>
  );
};

export default DetailsComp;
