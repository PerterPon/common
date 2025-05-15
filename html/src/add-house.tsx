import React from 'react';
import { Form, Input, InputNumber, Button, DatePicker, message } from 'antd';
import { requestData } from './request';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const AddHouse: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // 格式化日期
      const data = {
        ...values,
        datetime: values.datetime ? values.datetime.format('YYYY-MM-DD HH:mm:ss') : null,
      };
      await requestData('addHouse', data);
      message.success({
        content: '添加成功',
        duration: 3,
      });
      form.resetFields();
    } catch (e) {
      message.error({
        content: '添加失败',
        duration: 3,
      });
    }
    setLoading(false);
  };

  return (
    <Form {...layout} form={form} name="add-house" onFinish={onFinish}>
      <Form.Item name="name" label="名称" rules={[{ required: true, message: '请输入名称' }]}> 
        <Input />
      </Form.Item>
      <Form.Item name="total_size" label="总面积" rules={[{ required: true, message: '请输入总面积' }]}> 
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="width" label="面宽" rules={[{ required: true, message: '请输入面宽' }]}> 
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="height" label="进深" rules={[{ required: true, message: '请输入进深' }]}> 
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="location" label="地段" rules={[{ required: true, message: '请输入位置' }]}> 
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="price" label="价格" rules={[{ required: true, message: '请输入价格' }]}> 
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="privacy" label="隐私" rules={[{ required: true, message: '请输入隐私' }]}> 
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="house_type" label="房屋类型" rules={[{ required: true, message: '请输入房屋类型' }]}> 
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="parking" label="停车位" rules={[{ required: true, message: '请输入停车位' }]}> 
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
        <Button type="primary" htmlType="submit" loading={loading}>添加</Button>
      </Form.Item>
    </Form>
  );
};

export default AddHouse; 