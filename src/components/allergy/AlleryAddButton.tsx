import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewAllergy } from '../../redux_toolkit/slices/allergySlice';
import { ruleForVaccine } from '../../validations/formValidator';
import { CInputString } from '../Customs/CInput/CInputString';
import './Allergy.scss';
// type PropType = {
//   setRefresh: React.Dispatch<SetStateAction<boolean>>;
//   addAllergy: (values: any) => void;
// };

const AllergyAddButton = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  //   const onFinish = (values: any) => {
  //     addAllergy(values);
  //     setRefresh((prevState) => !prevState);
  //     handleCancel();
  //   };

  const onFinish = (values: any) => {
    dispatch(addNewAllergy(values.name));
    handleCancel();
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const trimmer = (value: string) => {
    const startTrimmedValue = value.trimStart();
    return startTrimmedValue;
  };
  return (
    <div>
      <Button className='button button--save' onClick={showModal}>
        Add allergy
      </Button>
      <Modal
        open={open}
        title='Add new Allergy'
        onCancel={handleCancel}
        footer={[]}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            wrapperCol={{ span: 24 }}
            label='Allergy name'
            name='name'
            rules={[ruleForVaccine]}
            hasFeedback
            normalize={trimmer}
          >
            <CInputString
              prefix={<UserOutlined />}
              placeholder='input allergy name'
            />
          </Form.Item>
          <div className='footer--buttons'>
            <Button className='button button--save' onClick={handleCancel}>
              Cancel
            </Button>
            <Button htmlType='submit' className='button button--save'>
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AllergyAddButton;
