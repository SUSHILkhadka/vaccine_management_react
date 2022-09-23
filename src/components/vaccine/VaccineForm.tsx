import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addVaccine } from '../../axios/backendVaccine';
import { PATH_VACCINE_TABLE } from '../../constants/routes';
import { RootState } from '../../redux_toolkit/stores/store';
import successMessage, { showDefaultErrorMessage } from '../../utils/message';
import { getVaccineBodyFromForm } from '../../utils/parser';
import { ruleForVaccine } from '../../validations/formValidator';
import { CInputString } from '../Customs/CInput/CInputString';
import { CTextArea } from '../Customs/CInput/CTextArea';
import CustomUpload from '../Customs/CUpload/CUpload';
import './VaccineForm.scss';

const VaccineForm: React.FC = () => {
  const [loading, setloading] = useState(false);
  const vaccineInfo = useSelector((state: RootState) => state.vaccine);

  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setloading(true);
    console.log(values);
    const body = {
      ...getVaccineBodyFromForm(values),
      photoUrl: vaccineInfo.photoUrl,
    };
    try {
      const response = await addVaccine(body);
      successMessage('vaccine added successfully');
      navigate(PATH_VACCINE_TABLE);
    } catch (e) {
      showDefaultErrorMessage();
    }
    setloading(false);
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
    <div>
        <Form
          layout='vertical'
          labelCol={{ offset: 1, span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          autoComplete='off'
          initialValues={defaultValue}
          requiredMark={false}
        >
          <div className='form--vaccine--header--container'>
            <Row>
              <Col className='form--vaccine--header--left' span={12}>
                <CustomUpload />
              </Col>
              <Col className='form--vaccine--header--right' span={12}>
                <Button htmlType='submit' loading={loading} className='button button--save'>
                  Save
                </Button>
              </Col>
            </Row>
          </div>
          <div className='form--vaccine'>

          <Form.Item
            wrapperCol={{ span: 12 }}
            label='Vaccine name'
            name='name'
            rules={[ruleForVaccine]}
            hasFeedback
            normalize={trimmer}
          >
            <CInputString
              prefix={<UserOutlined />}
              placeholder='input vaccine name'
            />
          </Form.Item>

          <Form.Item
            label='Number of Doses'
            name='numberOfDoses'
            rules={[ruleForVaccine]}
            hasFeedback
          >
            <CInputString
              type='number'
              prefix={<LockOutlined />}
              placeholder='input number of doses required'
            />
          </Form.Item>

          <Form.Item
            label='Release Date'
            name='releaseDate'
            rules={[ruleForVaccine]}
            hasFeedback
          >
            <CInputString
              type='date'
              prefix={<LockOutlined />}
              placeholder='input vaccine release date'
            />
          </Form.Item>

          <Form.Item label='Description' name='description' hasFeedback>
            <CTextArea rows={4} autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
          </div>

          {/* <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <CButtonLogin loading={loading} htmlType='submit'>
              Sign Up
            </CButtonLogin>
          </Form.Item>
          <Link to={PATH_LOGIN}>Log In</Link> */}
        </Form>
      </div>
  );
};

export default VaccineForm;
