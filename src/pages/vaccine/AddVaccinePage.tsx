import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import VaccineForm from '../../components/vaccine/VaccineForm';
import { resetAllergyList } from '../../redux_toolkit/slices/allergySlice';
import {
  initalValue,
  resetVaccine,
} from '../../redux_toolkit/slices/vaccineSlice';
import '../../styles/Page.scss';
const AddVaccinePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetVaccine());
    dispatch(resetAllergyList());
  }, []);

  return (
    <div className='page--addvaccine'>
      <VaccineForm initialValue={initalValue} />
    </div>
  );
};

export default AddVaccinePage;
