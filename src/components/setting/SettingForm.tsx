import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUser, logout } from '../../axios/backendUser';
import { PATH_LOGIN } from '../../constants/routes';
import { saveLoginResponse } from '../../cookies/cookie';
import { AppDispatch, RootState } from '../../redux_toolkit/stores/store';
import '../../styles/Form.scss';
import successMessage, {
  errorMessage,
  showDefaultErrorMessage,
} from '../../utils/message';
import { getEditPasswordBodyFromForm } from '../../utils/parser';
import {
  confirmPasswordRule,
  newPasswordRule,
  ruleForOldPassword,
  ruleForSignIn,
} from '../../validations/formValidator';
import { CButtonLogin } from '../Customs/CButtons/CButtonLogin';
import { CInputPassword } from '../Customs/CInput/CInputPassword';
import { CInputString } from '../Customs/CInput/CInputString';
import './SettingForm.scss';

const SettingForm: React.FC = () => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const [loading, setloading] = useState(false);
  const [isChangeName, setChangeName] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const negateIsChangeName = () => {
    setChangeName(!isChangeName);
  };

  const onFinish = async (values: any) => {
    setloading(true);
    try {
      const body = getEditPasswordBodyFromForm(values);
      const response = await editUser({
        ...body,
        name: isChangeName ? body.name.trim() : authInfo.username,
      });

      if (!isChangeName) {
        successMessage('Password changed successfully');
      } else {
        successMessage('Name changed successfully');
      }
      const res = await logout();
      saveLoginResponse('');
      navigate(PATH_LOGIN);
    } catch (e: any) {
      if (e.response) {
        errorMessage(e.response.data.message);
      } else {
        showDefaultErrorMessage();
      }
    }
    setloading(false);
  };

  const newNameRule = (getFieldValue: any, value: string) => {
    if (isChangeName && getFieldValue('name').trim() === authInfo.username) {
      return Promise.reject(new Error('New name cannot be same as old name'));
    } else {
      return Promise.resolve();
    }
  };

  const trimmer = (value: string) => {
    const startTrimmedValue = value.trimStart();
    return startTrimmedValue;
  };

  const defaultValue = {
    name: authInfo.username,
    email: authInfo.email,
  };

  return (
    <div className='form form--setting'>
      <Form
        style={{ width: '100%' }}
        layout='vertical'
        labelCol={{ offset: 1, span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        autoComplete='off'
        initialValues={defaultValue}
        requiredMark={false}
      >
        <Form.Item label='Email' name='email' hasFeedback normalize={trimmer}>
          <CInputString
            disabled={true}
            prefix={<MailOutlined />}
            placeholder='input your email'
          />
        </Form.Item>

        {isChangeName && (
          <Form.Item
            label='User name'
            name='name'
            rules={[
              ruleForSignIn,
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return newNameRule(getFieldValue, value);
                },
              }),
            ]}
            hasFeedback
            normalize={trimmer}
          >
            <CInputString
              value={isChangeName ? '' : authInfo.username}
              prefix={<UserOutlined />}
              placeholder='input your name'
            />
          </Form.Item>
        )}

        <Form.Item
          wrapperCol={{ span: 24 }}
          label='Old Password'
          name='oldPassword'
          rules={[ruleForOldPassword]}
          hasFeedback
        >
          <CInputPassword
            prefix={<LockOutlined />}
            placeholder='input your old password'
          />
        </Form.Item>

        {!isChangeName && (
          <Form.Item
            label='Password'
            name='password'
            dependencies={['oldPassword']}
            rules={[
              ruleForSignIn,
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return newPasswordRule(getFieldValue, value);
                },
              }),
            ]}
            hasFeedback
          >
            <CInputPassword
              prefix={<LockOutlined />}
              placeholder='input your new password'
            />
          </Form.Item>
        )}
        {!isChangeName && (
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
              placeholder='confirm your new  password'
            />
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <CButtonLogin loading={loading} htmlType='submit'>
            {isChangeName ? 'Save Name' : 'Save Password'}
          </CButtonLogin>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <a onClick={negateIsChangeName}>
            {isChangeName ? 'Change password instead' : 'Change name instead'}
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingForm;
