import React, { useEffect, useState } from 'react';
import { News, News_Modify } from '@/models/news';
import { Form, message } from 'antd';
import { modifyNews, queryNews } from '../service';
import FormComp from './FormComp';

export interface EntityFormProps {
  onSubmitted: () => void;
  bizId: string;
}

type Entity = News;
const ReactFormComponent = FormComp;

type EntitySubmitType = News_Modify;
const entityApiService = {
  modifyEntity: modifyNews,
  queryEntity: queryNews,
};

const ModifyForm: React.FC<EntityFormProps> = (props) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [bizData, setBizData] = useState<Entity | null>(null);

  const onReset = () => {
    form.setFieldsValue({ ...bizData });
  };

  useEffect(() => {
    setLoading(true);
    entityApiService
      .queryEntity(props.bizId)
      .then((res) => {
        if (res.code === 200) {
          console.log('res.data: ', res.data);
          setBizData({ ...res.data });
          form.setFieldsValue({ ...res.data });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ReactFormComponent
      bizDataLoading={loading}
      form={form}
      onReset={onReset}
      onFinish={(values) => {
        const submitData = { ...values } as EntitySubmitType;
        setLoading(true);
        entityApiService.modifyEntity(submitData).then((res) => {
          if (res.code === 200) {
            message.info('修改成功');
            setLoading(false);
            props.onSubmitted();
          }
        });
      }}
    />
  );
};

export default ModifyForm;
