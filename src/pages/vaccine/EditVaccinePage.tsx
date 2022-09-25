import { useSelector } from 'react-redux'
import VaccineForm from '../../components/vaccine/VaccineForm'
import { RootState } from '../../redux_toolkit/stores/store'
import "../../styles/Page.scss"
const EditVaccinePage=()=>{
    const vaccineInfo=useSelector((state:RootState)=>state.vaccine)
    const initialValue={
        id: vaccineInfo.id,
        name: vaccineInfo.name,
        description: vaccineInfo.description,
        numberOfDoses: vaccineInfo.numberOfDoses,
        releaseDate: vaccineInfo.releaseDate,
        photoUrl: vaccineInfo.photoUrl,
        isMandatory: vaccineInfo.isMandatory,
    }

    return(
        <div className='page--addvaccine'>
            Edit page
            <VaccineForm initialValue={initialValue}/>
        </div>
    )
    }
    
    export default EditVaccinePage
    