import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IVaccine } from '../../../interface/IVaccine';
import { sortByFavouritesOnly } from '../../../utils/sort';
import './CSort.scss';

type PropType = {
  dataOriginal: IVaccine[];
  setDataToDisplay: Dispatch<SetStateAction<IVaccine[]>>;
};
const CustomSort = ({ dataOriginal, setDataToDisplay }: PropType) => {
  const [mandatoryOnly, setMandatoryOnly] = useState<boolean>(false);
  useEffect(() => {
    if (mandatoryOnly) switchToFavouritesOnly();
  }, [dataOriginal]);

  const switchToAll = () => {
    const temp = Object.create(dataOriginal);
    setDataToDisplay(temp);
  };

  const switchToFavouritesOnly = () => {
    const listOfFavourite: IVaccine[] = sortByFavouritesOnly(dataOriginal);
    if (listOfFavourite.length > 0) {
      setDataToDisplay(listOfFavourite);
    } else {
      setDataToDisplay([]);
    }
  };

  const handleChange = () => {
    if (mandatoryOnly) {
      switchToAll();
      setMandatoryOnly(false);
    } else {
      switchToFavouritesOnly();
      setMandatoryOnly(true);
    }
  };

  return (
    <div className='custom--dropdown--container'>
      <div onClick={handleChange} className='custom--dropdown--button'>
        <div>
          {mandatoryOnly && (
            <span className='custom--dropdown--span'>&#10003;</span>
          )}
          {!mandatoryOnly && (
            <span className='custom--dropdown--span'>&#10005;</span>
          )}
          Show Favourites Only
        </div>
      </div>
    </div>
  );
};
export default CustomSort;
