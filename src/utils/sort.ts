import { IVaccine } from '../interface/IVaccine';

export const sortByAscendingAll = (dataOriginal: IVaccine[]) => {
  const temp = JSON.parse(JSON.stringify(dataOriginal));
  temp.sort(function (a: IVaccine, b: IVaccine) {
    const keyA = a.name;
    const keyB = b.name;
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  return temp;
};
export const sortByDescendingAll = (dataOriginal: IVaccine[]) => {
  const temp = JSON.parse(JSON.stringify(dataOriginal));
  temp.sort(function (a: IVaccine, b: IVaccine) {
    const keyA = a.name;
    const keyB = b.name;
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });
  return temp;
};

export const sortByAscendingFavouritesOnly = (dataOriginal: IVaccine[]) => {
  const listOfFavourite: IVaccine[] = [];
  dataOriginal.forEach((element: IVaccine) => {
    if (element.isMandatory) listOfFavourite.push(element);
  });
  return listOfFavourite;
};

export const sortByAscendingFavouritesFirstThenRest = (
  dataOriginal: IVaccine[]
) => {
  const listOfFavourite: IVaccine[] = [];
  const listofNonFavourite: IVaccine[] = [];
  dataOriginal.forEach((element: IVaccine) => {
    if (element.isMandatory) listOfFavourite.push(element);
    if (!element.isMandatory) listofNonFavourite.push(element);
  });
  const finalConcatenatedArray = listOfFavourite.concat(listofNonFavourite);
  return finalConcatenatedArray;
};
