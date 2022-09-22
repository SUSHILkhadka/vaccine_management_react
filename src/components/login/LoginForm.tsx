import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import React from 'react';
import '../../styles/Form.scss';
import { CButtonLogin } from '../Customs/CButtons/CButtonLogin';
import { CInputPassword } from '../Customs/CInput/CInputPassword';
import { CInputString } from '../Customs/CInput/CInputString';
const LoginForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='form'>
      <div className='form--login--header'>Login</div>
      <Form
        name='basic'
        layout='vertical'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        requiredMark={false}
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <CInputString prefix={<MailOutlined />} placeholder="input your email"/>
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <CInputPassword prefix={<LockOutlined />}  placeholder="input your password"/>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <CButtonLogin loading={false} htmlType='submit'>
            Login
          </CButtonLogin>
        </Form.Item>
        <a>Sign Up</a>
      </Form>
    </div>
  );
};

export default LoginForm;
