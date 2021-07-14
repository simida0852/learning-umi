import React from 'react';
import { Button, Form, Input, Spin } from 'antd';
import { defaultFormLayout, defaultFormTailLayout } from '@/utils/formUtils';
import { InnerFormProps } from '@/pages/form';
import ReactQuillCom from './ReactQuillComp';

const FormItem = Form.Item;

type CreateFormProps = InnerFormProps;

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { bizDataLoading, onReset, ...formProps } = props;

  return (
    <Spin spinning={bizDataLoading} tip="正在加载数据,请稍候..." delay={500}>
      <Form {...defaultFormLayout} {...formProps}>
        <FormItem name="title" label="标题" rules={[{ required: false }]}>
          <Input placeholder="标题" />
        </FormItem>
        <FormItem name="content" label="内容" rules={[{ required: false }]}>
          <ReactQuillCom />
        </FormItem>
        <Form.Item {...defaultFormTailLayout}>
          <Button type="primary" htmlType="submit" disabled={bizDataLoading}>
            提交
          </Button>
          {onReset && (
            <Button htmlType="button" onClick={onReset} style={{ marginLeft: 8 }}>
              重置
            </Button>
          )}
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CreateForm;
