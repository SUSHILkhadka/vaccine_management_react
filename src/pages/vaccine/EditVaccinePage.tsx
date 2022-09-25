import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAllergiesByPatientId } from '../../axios/backendAllergy';
import VaccineForm from '../../components/vaccine/VaccineForm';
import {
  loadAllergyList,
  resetAllergyList,
} from '../../redux_toolkit/slices/allergySlice';
import { RootState } from '../../redux_toolkit/stores/store';
import '../../styles/Page.scss';
import { showDefaultErrorMessage } from '../../utils/message';
const EditVaccinePage = () => {
  const vaccineInfo = useSelector((state: RootState) => state.vaccine);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    dispatch(resetAllergyList());

    const getAllAllergyOfVaccine = async () => {
      try {
        const response = await getAllAllergiesByPatientId(vaccineInfo.id);
        if (isMounted) {
          dispatch(loadAllergyList(response.data));
        }
      } catch {
        showDefaultErrorMessage();
      }
    };
    getAllAllergyOfVaccine();

    return () => {
      isMounted = false;
    };
  }, []);

  const initialValue = {
    id: vaccineInfo.id,
    name: vaccineInfo.name,
    description: vaccineInfo.description,
    numberOfDoses: vaccineInfo.numberOfDoses,
    releaseDate: vaccineInfo.releaseDate,
    photoUrl: vaccineInfo.photoUrl,
    isMandatory: vaccineInfo.isMandatory,
  };

  return (
    <div className='page--addvaccine'>
      Edit page
      <VaccineForm initialValue={initialValue} />
    </div>
  );
};

export default EditVaccinePage;
