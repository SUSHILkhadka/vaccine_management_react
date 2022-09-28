import { useSelector } from 'react-redux';
import { IAllergy } from '../../interface/IAllergy';
import { RootState } from '../../redux_toolkit/stores/store';
import './Allergy.scss';
import AllergyCard from './AllergyCard';
import AllergyAddButton from './AlleryAddButton';

const AllergyTable = () => {
  const allergyArrayInfo = useSelector((state: RootState) => state.allergy);
  return (
    <div>
      <AllergyAddButton />
      <div className='allergy--list--container'>
        <>
          {allergyArrayInfo.map((element: IAllergy, index: number) => {
            if (element.status != 'deleted')
              return <AllergyCard key={element.id} index={index} name={element.name} />;
          })}
        </>
      </div>
    </div>
  );
};
export default AllergyTable;
