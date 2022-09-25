import { SetStateAction } from 'react';
import './Allergy.scss';

type PropType = {
  setRefresh: React.Dispatch<SetStateAction<boolean>>;

  newAllergy: string[];
  setNewAllergy: React.Dispatch<SetStateAction<string[]>>;
  index: number;
};
const AllergyCard = ({
  setRefresh,
  newAllergy,
  setNewAllergy,
  index,
}: PropType) => {
  const handleDelete = () => {
    const temp = newAllergy;
    temp.splice(index, 1);
    setNewAllergy(temp);
    setRefresh((prevState) => !prevState);
  };
  return (
    <div onClick={handleDelete} className='allergy--card'>
      {newAllergy[index]}
    </div>
  );
};

export default AllergyCard;
