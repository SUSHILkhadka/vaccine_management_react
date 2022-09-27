import { IVaccine } from '../interface/IVaccine';

export const compareName = (a: IVaccine, b: IVaccine) => {
  const keyA = a.name.toLowerCase();
  const keyB = b.name.toLowerCase();
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
};
export const compareReleaseDate = (a: IVaccine, b: IVaccine) => {
  const keyA = a.releaseDate.toLowerCase();
  const keyB = b.releaseDate.toLowerCase();
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
};
export const compareNumberOfDoses = (a: IVaccine, b: IVaccine) => {
  const keyA = a.numberOfDoses;
  const keyB = b.numberOfDoses;
  return keyA - keyB;
};

export const compareIsMandatory = (a: IVaccine, b: IVaccine) => {
  const keyA = a.isMandatory;
  const keyB = b.isMandatory;
  if (keyA > keyB) return -1;
  if (keyA < keyB) return 1;
  return 0;
};

export const sortByFavouritesOnly = (dataOriginal: IVaccine[]) => {
  const listOfFavourite: IVaccine[] = [];
  dataOriginal.forEach((element: IVaccine) => {
    if (element.isMandatory) listOfFavourite.push(element);
  });
  return listOfFavourite;
};
