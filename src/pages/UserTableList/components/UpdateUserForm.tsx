import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { queryUser } from '../service';

export const UpdateUserForm = (props: any) => {
  const { rowId: id, onSubmit: handleUpdate } = props;

  const [form] = Form.useForm();

  const [formVals, setFormVals] = useState({});

  useEffect(() => {
    queryUser(id).then((res) => {
      if (res.code === 200) {
        form.setFieldsValue(res.data);
      }
    });
  }, []);

  const onFinish = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    handleUpdate({ ...formVals, ...fieldsValue });
  };

  return (
    <Form layout="vertical" hideRequiredMark form={form} onFinish={onFinish}>
      <Form.Item
        label="账号"
        name="account"
        rules={[{ required: true, message: '请输入您的账号!' }]}
      >
        <Input placeholder="请输入您的账号" />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入您的密码!' }]}
      >
        <Input.Password
          placeholder="请输入您的密码"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};
