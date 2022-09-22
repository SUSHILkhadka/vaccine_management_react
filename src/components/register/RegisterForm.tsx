import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { PATH_LOGIN } from '../../constants/routes';
import { IRegister } from '../../interface/IRegister';
import '../../styles/Form.scss';
import { ruleForSignIn } from '../../validations/formValidator';
import { CButtonLogin } from '../Customs/CButtons/CButtonLogin';
import { CInputPassword } from '../Customs/CInput/CInputPassword';
import { CInputString } from '../Customs/CInput/CInputString';

const RegisterForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log({ ...values } as IRegister);
  };

  const confirmPasswordRule = (getFieldValue: any, value: string) => {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Password do not match'));
    }
  };

  const trimmer = (value: string) => {
    const startTrimmedValue = value.trimStart();
    return startTrimmedValue;
  };

  return (
    <div className='form'>
      <div className='form--login--header'>SignUp</div>
      <Form
        // name='basic'
        layout='vertical'
        labelCol={{ offset: 1, span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
      >
        <Form.Item
          label='User name'
          name='name'
          rules={[ruleForSignIn]}
          hasFeedback
          normalize={trimmer}
        >
          <CInputString
            prefix={<UserOutlined />}
            placeholder='input your name'
          />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[ruleForSignIn]}
          hasFeedback
          normalize={trimmer}
        >
          <CInputString
            prefix={<MailOutlined />}
            placeholder='input your email'
          />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[ruleForSignIn]}
          hasFeedback
        >
          <CInputPassword
            prefix={<LockOutlined />}
            placeholder='input your password'
          />
        </Form.Item>

        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          dependencies={['password']}
          hasFeedback
          normalize={trimmer}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                return confirmPasswordRule(getFieldValue, value);
              },
            }),
          ]}
        >
          <CInputPassword
            prefix={<LockOutlined />}
            placeholder='confirm your password'
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <CButtonLogin loading={false} htmlType='submit'>
            Sign Up
          </CButtonLogin>
        </Form.Item>
        <Link to={PATH_LOGIN}>Log In</Link>
      </Form>
    </div>
  );
};

export default RegisterForm;
