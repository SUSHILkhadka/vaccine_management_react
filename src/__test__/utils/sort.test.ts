import { IVaccine } from '../../interface/IVaccine';
import { sortByFavouritesOnly } from '../../utils/sort';

export const vaccineArray = [
  {
    id: 1,
    name: 'a',
    description: '',
    numberOfDoses: 1,
    releaseDate: new Date().toLocaleDateString(),
    photoUrl: '',
    isMandatory: false,
  },
  {
    id: 2,
    name: 'a',
    description: '',
    numberOfDoses: 1,
    releaseDate: new Date().toLocaleDateString(),
    photoUrl: '',
    isMandatory: true,
  },
  {
    id: 3,
    name: 'a',
    description: '',
    numberOfDoses: 1,
    releaseDate: new Date().toLocaleDateString(),
    photoUrl: '',
    isMandatory: false,
  },
  {
    id: 4,
    name: 'a',
    description: '',
    numberOfDoses: 1,
    releaseDate: new Date().toLocaleDateString(),
    photoUrl: '',
    isMandatory: true,
  },
];
describe('sort by favourites only name all', () => {
  it('should return only mandatory vaccine objects', () => {
    const input: IVaccine[] = vaccineArray;
    const output = sortByFavouritesOnly(input);
    const expectedOutput: IVaccine[] = [vaccineArray[1], vaccineArray[3]];
    expect(output).toEqual(expectedOutput);
  });

  it('should return empty array, when empty array is passed', () => {
    const input: IVaccine[] = [];
    const output = sortByFavouritesOnly(input);
    const expectedOutput: IVaccine[] = [];
    expect(output).toEqual(expectedOutput);
  });
});
