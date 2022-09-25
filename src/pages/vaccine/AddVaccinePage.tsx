import VaccineForm from '../../components/vaccine/VaccineForm';
import { initalValue } from '../../redux_toolkit/slices/vaccineSlice';
import '../../styles/Page.scss';
const AddVaccinePage = () => {
  return (
    <div className='page--addvaccine'>
      Add page
      <VaccineForm initialValue={initalValue} />
    </div>
  );
};

export default AddVaccinePage;
