import { useDispatch } from 'react-redux';
import { deleteAllergy } from '../../redux_toolkit/slices/allergySlice';
import './Allergy.scss';

// type PropType = {
//   setRefresh: React.Dispatch<SetStateAction<boolean>>;

//   newAllergy: string[];
//   setNewAllergy: React.Dispatch<SetStateAction<string[]>>;
//   index: number;
// };

type PropType = {
  index: number;
  name: string;
};

const AllergyCard = ({ index, name }: PropType) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteAllergy(index));
  };
  return (
    <div onClick={handleDelete} className='allergy--card'>
      {name}
    </div>
  );
};

export default AllergyCard;
