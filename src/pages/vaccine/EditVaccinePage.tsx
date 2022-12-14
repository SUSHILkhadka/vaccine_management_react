import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAllergiesByPatientId } from '../../axios/backendAllergy';
import VaccineForm from '../../components/vaccine/VaccineForm';
import {
  loadAllergyList,
  resetAllergyList,
} from '../../redux_toolkit/slices/allergySlice';
import { RootState } from '../../redux_toolkit/stores/store';
import '../../styles/Page.scss';
import { errorMessage, showDefaultErrorMessage } from '../../utils/message';
const EditVaccinePage = () => {
  const vaccineInfo = useSelector((state: RootState) => state.vaccine);
  const dispatch = useDispatch();
  const [loadingAllergy,setLoadingAllergy]=useState(true);

  useEffect(() => {
    let isMounted = true;
    dispatch(resetAllergyList());

    const getAllAllergyOfVaccine = async () => {
      try {
        const response = await getAllAllergiesByPatientId(vaccineInfo.id);
        if (isMounted) {
          dispatch(loadAllergyList(response.data));
        }
      } catch (e: any) {
        if (e.response && e.response.data) {
          errorMessage(e.response.data.message);
        } else {
          showDefaultErrorMessage();
        }
      }
      setLoadingAllergy(false)
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
      <VaccineForm initialValue={initialValue} loadingAllergy={loadingAllergy} />
    </div>
  );
};

export default EditVaccinePage;
