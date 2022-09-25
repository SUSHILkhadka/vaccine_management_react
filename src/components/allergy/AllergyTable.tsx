import { useEffect, useState } from 'react';
import './Allergy.scss';
import AllergyCard from './AllergyCard';
import AllergyAddButton from './AlleryAddButton';
type PropType = {
  vaccineId: number;
};
const AllergyTable = ({ vaccineId }: PropType) => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [newAllergy, setNewAllergy] = useState<string[]>(['new']);

  useEffect(() => {
    console.log(newAllergy);
  }, [refresh]);

  const addAllergy = (values: any) => {
    const temp = newAllergy;
    temp.push(values.name);
    setNewAllergy(temp);
  };

  return (
    <div>
      <AllergyAddButton setRefresh={setRefresh} addAllergy={addAllergy} />
      <div className='allergy--list--container'>
        <>
          {newAllergy.map((element: string, index: number) => {
            return (
              <AllergyCard
                setRefresh={setRefresh}
                newAllergy={newAllergy}
                setNewAllergy={setNewAllergy}
                index={index}
              />
            );
          })}
        </>
      </div>
    </div>
  );
};
export default AllergyTable;
