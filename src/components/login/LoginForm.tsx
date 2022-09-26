import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../axios/backendUser';
import { PATH_REGISTER, PATH_ROOT } from '../../constants/routes';
import { saveLoginResponse } from '../../cookies/cookie';
import { setAuthWithLoginResponse } from '../../redux_toolkit/slices/authSlice';
import '../../styles/Form.scss';
import successMessage, {
  errorMessage,
  showDefaultErrorMessage,
} from '../../utils/message';
import { getLoginBodyFromForm } from '../../utils/parser';
import { CButtonLogin } from '../Customs/CButtons/CButtonLogin';
import { CInputPassword } from '../Customs/CInput/CInputPassword';
import { CInputString } from '../Customs/CInput/CInputString';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  const onFinish = async (values: FormData) => {
    setloading(true);
    const body = getLoginBodyFromForm(values);
    try {
      const response = await login(body);

      dispatch(setAuthWithLoginResponse(response));
      saveLoginResponse(response);
      navigate(PATH_ROOT, { replace: true });
      successMessage(response.message);
    } catch (e: any) {
      if (e.response) {
        errorMessage(e.response.data.message);
      } else {
        showDefaultErrorMessage();
      }
    }

    setloading(false);
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
