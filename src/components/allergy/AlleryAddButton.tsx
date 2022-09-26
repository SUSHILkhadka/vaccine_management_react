import { Button } from 'antd';
import { useState } from 'react';
import CModalAllergy from '../Customs/CModalAllergy/CModalAllergy';
import './Allergy.scss';

const AllergyAddButton = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className='button button--save' onClick={showModal}>
        Add allergy
      </Button>
      <CModalAllergy
        open={open}
        handleCancel={handleCancel}
        edit={{ name: undefined }}
      />
    </div>
  );
};

export default AllergyAddButton;
