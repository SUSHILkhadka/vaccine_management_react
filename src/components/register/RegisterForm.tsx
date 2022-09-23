import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../axios/backendUser';
import { PATH_LOGIN } from '../../constants/routes';
import { IRegister } from '../../interface/IRegister';
import '../../styles/Form.scss';
import successMessage, { errorMessage } from '../../utils/message';
import { getRegisterBodyFromForm } from '../../utils/parser';
import { checkIfEmailAlreadyExists, ruleForSignIn } from '../../validations/formValidator';
import { CButtonLogin } from '../Customs/CButtons/CButtonLogin';
import { CInputPassword } from '../Customs/CInput/CInputPassword';
import { CInputString } from '../Customs/CInput/CInputString';

const RegisterForm: React.FC = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setloading(true);
    const body: IRegister = getRegisterBodyFromForm(values);
    console.log('body from parser = ', body);
    try {
      const response = await register(body);

      successMessage(response.message);
      navigate(PATH_LOGIN);
    } catch (e: any) {
      console.log('error from server = ', e);

      if (e.response) errorMessage(e.response.data.message);
      else errorMessage(e);
    }
    setloading(false);
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

  const defaultValue = {
    name: 'a',
    email: 'a@gmail.com',
    password: 'a@gmail.com',
    confirmPassword: 'a@gmail.com',
  };

  return (
    <div className='form'>
      <div className='form--login--header'>SignUp</div>
      <Form
        layout='vertical'
        labelCol={{ offset: 1, span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        autoComplete='off'
        initialValues={defaultValue}
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
          // rules={[ruleForSignIn]}
          rules={[checkIfEmailAlreadyExists]}
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
          <CButtonLogin loading={loading} htmlType='submit'>
            Sign Up
          </CButtonLogin>
        </Form.Item>
        <Link to={PATH_LOGIN}>Log In</Link>
      </Form>
    </div>
  );
};

export default RegisterForm;
