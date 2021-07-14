import React, { useState } from 'react';
import { News_Create } from '@/models/news';
import { Form, message } from 'antd';
import { createNews } from '../service';
import FormComp from './FormComp';

export interface EntityFormProps {
  onSubmitted: () => void;
}

const ReactFormComponent = FormComp;

type EntitySubmitType = News_Create;
const entityApiService = {
  createEntity: createNews,
};

const CreateForm: React.FC<EntityFormProps> = (props) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  return (
    <ReactFormComponent
      bizDataLoading={loading}
      form={form}
      onFinish={(values) => {
        console.log('values: ', values);
        const submitData = { ...values } as EntitySubmitType;
        setLoading(true);
        entityApiService.createEntity(submitData).then((res) => {
          if (res.code === 200) {
            message.info('添加成功');
            setLoading(false);
            props.onSubmitted();
          }
        });
      }}
    />
  );
};

export default CreateForm;
