import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { PATH_REGISTER } from '../../constants/routes';
import '../../styles/Form.scss';
import { CButtonLogin } from '../Customs/CButtons/CButtonLogin';
import { CInputPassword } from '../Customs/CInput/CInputPassword';
import { CInputString } from '../Customs/CInput/CInputString';

const LoginForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div className='form'>
      <div className='form--login--header'>LogIn</div>
      <Form
        layout='vertical'
        labelCol={{ offset: 1, span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <CInputString
            prefix={<MailOutlined />}
            placeholder='input your email'
          />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <CInputPassword
            prefix={<LockOutlined />}
            placeholder='input your password'
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <CButtonLogin loading={false} htmlType='submit'>
            Login
          </CButtonLogin>
        </Form.Item>
        <Link to={PATH_REGISTER}>Sign Up</Link>
      </Form>
    </div>
  );
};

export default LoginForm;
