import VaccineForm from '../../components/vaccine/VaccineForm'
import { defaultValue } from '../../redux_toolkit/slices/vaccineSlice'
import "../../styles/Page.scss"
const AddVaccinePage=()=>{
    const initialValue=defaultValue;
    
    return(
        <div className='page--addvaccine'>
            Add page
            <VaccineForm initialValue={initialValue}/>
        </div>
    )
    }
    
    export default AddVaccinePage
    