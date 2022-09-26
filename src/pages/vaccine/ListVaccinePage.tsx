import { message, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { readAllVaccines } from '../../axios/backendVaccine';
import CustomSort from '../../components/Customs/CSort/CSort';
import CTable from '../../components/Customs/CTable/CTable';
import { IVaccine } from '../../interface/IVaccine';
import { errorMessage, showDefaultErrorMessage } from '../../utils/message';
import { sortByAscendingAll } from '../../utils/sort';

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
          const sortedArray = sortByAscendingAll(vaccines.data);
          setDataOrignal(sortedArray);
          setDataToDisplay(sortedArray);
        }
      } catch (e: any) {
        if(e.response)errorMessage(e.response.data.message)
        else showDefaultErrorMessage()
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
      <div>
        <CustomSort
          dataOriginal={dataOriginal}
          setDataToDisplay={setDataToDisplay}
        />
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <CTable Obj={dataToDisplay} reloadHandler={handleReload} />
      )}
    </div>
  );
};
export default ListVaccinePage
