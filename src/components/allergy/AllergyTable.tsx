import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { IAllergy } from '../../interface/IAllergy';
import { RootState } from '../../redux_toolkit/stores/store';
import './Allergy.scss';
import AllergyCard from './AllergyCard';
import AllergyAddButton from './AlleryAddButton';

// const AllergyTable = (loadingAllergy: boolean | undefined) => {
const AllergyTable = ({ loadingAllergy }: { loadingAllergy?: boolean }) => {
  const allergyArrayInfo = useSelector((state: RootState) => state.allergy);
  return (
    <div>
      <AllergyAddButton />
      <div className='allergy--list--container'>
        {loadingAllergy ? (
          <Spin className='allergy--list--spin' />
        ) : (
          <>
            {allergyArrayInfo.map((element: IAllergy, index: number) => {
              if (element.status != 'deleted')
               {
                 return (
                  <AllergyCard
                    key={element.id}
                    index={index}
                    name={element.name}
                  />
                );}
            })}
          </>
        )}
      </div>
    </div>
  );
};
export default AllergyTable;
