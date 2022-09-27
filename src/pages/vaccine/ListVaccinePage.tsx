import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { readAllVaccines } from '../../axios/backendVaccine';
import CustomSort from '../../components/Customs/CSort/CSort';
import CTable from '../../components/Customs/CTable/CTable';
import { IVaccine } from '../../interface/IVaccine';
import { errorMessage, showDefaultErrorMessage } from '../../utils/message';

const ListVaccinePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataOriginal, setDataOrignal] = useState<IVaccine[]>([]);
  const [dataToDisplay, setDataToDisplay] = useState<IVaccine[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  const handleReload = () => {
    setReload((current) => !current);
  };

  useEffect(() => {
    let isMounted = true;

    const getalldata = async () => {
      try {
        const vaccines = await readAllVaccines();
        if (isMounted) {
          setDataOrignal(vaccines.data);
          setDataToDisplay(vaccines.data);
        }
      } catch (e: any) {
        if (e.response && e.response.data) errorMessage(e.response.data.message);
        else showDefaultErrorMessage();
        setDataToDisplay([]);
      }
      setLoading(false);
    };
    getalldata();

    return () => {
      isMounted = false;
    };
  }, [reload]);

  return (
    <div className='page--listvaccine'>
        <CustomSort
          dataOriginal={dataOriginal}
          setDataToDisplay={setDataToDisplay}
        />
      {loading ? (
        <Skeleton active />
      ) : (
        <CTable Obj={dataToDisplay} reloadHandler={handleReload} />
      )}
    </div>
  );
};
export default ListVaccinePage;
