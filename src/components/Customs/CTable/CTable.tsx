import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteVaccine, editVaccine } from '../../../axios/backendVaccine';
import { PATH_VACCINE_EDIT } from '../../../constants/routes';
import { IVaccine } from '../../../interface/IVaccine';
import { loadVaccine } from '../../../redux_toolkit/slices/vaccineSlice';
import successMessage, { showDefaultErrorMessage } from '../../../utils/message';
import { GetColumns } from '../../utils/GetColumns';

type propsTypeforVaccineTable = {
  Obj: IVaccine[];
  reloadHandler: () => void;
};
const CTable = (props: propsTypeforVaccineTable) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    try {
      const vaccine = await deleteVaccine(id);
      if (vaccine.data) {
        successMessage('Vaccine deleted successfully');
      }
      props.reloadHandler();
    } catch (e: any) {
      showDefaultErrorMessage()
    }
  };

  const handleEdit = (vaccine: IVaccine) => {
    dispatch(loadVaccine(vaccine));
    navigate(PATH_VACCINE_EDIT);
  };

  const handleFavouriteChange = async (vaccine: IVaccine) => {
    const body = {
      ...vaccine,
      isMandatory: !vaccine.isMandatory,
    };
    try {
      const response = await editVaccine(body, vaccine.id);
      successMessage('Vaccine edited successfully')
      props.reloadHandler();
    } catch (e: any) {
      showDefaultErrorMessage();
    }
  };

  const columns = GetColumns(handleFavouriteChange, handleEdit, handleDelete);

  return (
    <div className='table-container'>
      <Table
        className='actual-table'
        columns={columns}
        dataSource={props.Obj}
        rowKey='id'
        data-testid='table'
      />
    </div>
  );
};

export default CTable;
