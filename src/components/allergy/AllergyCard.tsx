import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAllergy } from '../../redux_toolkit/slices/allergySlice';
import CModalAllergy from '../Customs/CModalAllergy/CModalAllergy';
import './Allergy.scss';

type PropType = {
  index: number;
  name: string;
};

const AllergyCard = ({ index, name }: PropType) => {
  const dispatch = useDispatch();
  const editParam = {
    index: index,
    name: name,
  };
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteAllergy(index));
  };

  return (
    <div>
      <div onClick={showModal} className='allergy--card'>
        {name}
        <div onClick={handleDelete} className='allergy--card--deleteicon'>
          &#10060;
        </div>
      </div>
      <CModalAllergy open={open} handleCancel={handleCancel} edit={editParam} />
    </div>
  );
};

export default AllergyCard;
