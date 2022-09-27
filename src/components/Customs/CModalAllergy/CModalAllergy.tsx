import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import {
  addNewAllergy,
  editAllergy,
} from '../../../redux_toolkit/slices/allergySlice';
import { ruleForVaccine } from '../../../validations/formValidator';
import '../../allergy/Allergy.scss';
import { CInputString } from '../../Customs/CInput/CInputString';

type EditParam = {
  index?: number;
  name: string | undefined;
};

type PropType = {
  open: boolean;
  handleCancel: () => void;
  edit: EditParam;
};

const CModalAllergy = ({ open, handleCancel, edit }: PropType) => {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    console.log('without trim ', values.name, '.');
      console.log('with trim ', values.name.trim(), '.');
    if (edit.name && values.name != edit.name) {
      console.log('edit',edit)
      dispatch(editAllergy({ ...edit, name: values.name.trim() }));
      console.log('edit after',{ ...edit, name: values.name.trim() })

    }
    if (!edit.name) {
      console.log('add')

      dispatch(addNewAllergy(values.name.trim()));
    }
    handleCancel();
  };

  const trimmer = (value: string) => {
    const startTrimmedValue = value.trimStart();
    return startTrimmedValue;
  };

  const initialValue = {
    name: edit.name,
  };

  return (
    <div>
      <Modal
        open={open}
        title={!edit.name ? 'Add new Allergy' : 'Edit Allergy'}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form onFinish={onFinish} initialValues={initialValue}>
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
export default CModalAllergy;
