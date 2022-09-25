import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IAllergy } from '../../interface/IAllergy';
import { RootState } from '../../redux_toolkit/stores/store';
import './Allergy.scss';
import AllergyCard from './AllergyCard';
import AllergyAddButton from './AlleryAddButton';
type PropType = {
  vaccineId: number;
};
const AllergyTable = ({ vaccineId }: PropType) => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const allergyArrayInfo=useSelector((state:RootState)=>state.allergy)

  const [newAllergy, setNewAllergy] = useState<string[]>(['new']);

  useEffect(() => {
    console.log(newAllergy);
  }, [refresh]);



  return (
    <div>
      <AllergyAddButton />
      <div className='allergy--list--container'>
        <>
          {allergyArrayInfo.map((element: IAllergy, index: number) => {
            if(element.status!="deleted")
            return (
              <AllergyCard
                index={index}
                name={element.name} 
              />
            );
          })}
        </>
      </div>
    </div>
  );
};
export default AllergyTable;
