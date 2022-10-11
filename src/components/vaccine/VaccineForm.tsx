import { LockOutlined, UserOutlined ,CalendarOutlined,NumberOutlined} from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addArrayOfAllergy,
  sentArrayOfAllergyToBackend,
} from '../../axios/backendAllergy';
import { addVaccine, editVaccine } from '../../axios/backendVaccine';
import { PATH_VACCINE_TABLE } from '../../constants/routes';
import { IVaccine } from '../../interface/IVaccine';
import { RootState } from '../../redux_toolkit/stores/store';
import successMessage, {
  errorMessage,
  showDefaultErrorMessage,
} from '../../utils/message';
import { getVaccineBodyFromForm } from '../../utils/parser';
import { ruleForVaccine } from '../../validations/formValidator';
import AllergyTable from '../allergy/AllergyTable';
import { CInputString } from '../Customs/CInput/CInputString';
import { CTextArea } from '../Customs/CInput/CTextArea';
import CustomUpload from '../Customs/CUpload/CUpload';
import './VaccineForm.scss';

type PropType = {
  initialValue: IVaccine;
  loadingAllergy?:boolean;
};
const VaccineForm = ({ initialValue,loadingAllergy }: PropType) => {
  const [loading, setloading] = useState(false);
  const vaccineInfo = useSelector((state: RootState) => state.vaccine);
  const allergyArrayInfo = useSelector((state: RootState) => state.allergy);

  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setloading(true);
    const body = {
      ...getVaccineBodyFromForm(values),
      photoUrl: vaccineInfo.photoUrl,
    };
    try {
      if (initialValue.name == '') {
        const response = await addVaccine(body);
        const responseAfterAllergy = await addArrayOfAllergy(
          allergyArrayInfo,
          response.data.id
        );
        successMessage('vaccine added successfully');
      } else {
        const response = await editVaccine(body, initialValue.id);
        const responseAfterAllergy = await sentArrayOfAllergyToBackend(
          allergyArrayInfo,
          initialValue.id
        );
        successMessage('vaccine edited successfully');
      }
      navigate(PATH_VACCINE_TABLE);
    } catch (e: any) {
      if (e.response && e.response.data) errorMessage(e.response.data.message);
      else showDefaultErrorMessage();
    }
    setloading(false);
  };

  const trimmer = (value: string) => {
    const startTrimmedValue = value.trimStart();
    return startTrimmedValue;
  };

  return (
    <div>
      <Form
        layout='vertical'
        labelCol={{ offset: 1, span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        autoComplete='off'
        initialValues={initialValue}
        requiredMark={false}
      >
        <div className='form--vaccine--header--container'>
          <Row>
            <Col className='form--vaccine--header--left' span={12}>
              <CustomUpload />
            </Col>
            <Col className='form--vaccine--header--right' span={12}>
              <Button
                htmlType='submit'
                loading={loading}
                className='button button--save'
              >
                Save
              </Button>
            </Col>
          </Row>
        </div>
        <div className='form--row2'>
          <div className='form form--vaccine'>
            <Form.Item
              wrapperCol={{ span: 24 }}
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
                prefix={<NumberOutlined />}
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
                prefix={<CalendarOutlined />}
                placeholder='input vaccine release date'
              />
            </Form.Item>

            <Form.Item label='Description' name='description' hasFeedback>
              <CTextArea rows={4} autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
          </div>
          <div className='form--allergy'>
            <AllergyTable loadingAllergy={loadingAllergy} />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default VaccineForm;
