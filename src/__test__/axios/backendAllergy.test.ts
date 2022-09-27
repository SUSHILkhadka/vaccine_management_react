import {
  addAllergy,
  deleteAllergy,
  getAllAllergiesByPatientId,
  sentArrayOfAllergyToBackend,
  updateAllergy,
} from '../../axios/backendAllergy';
import { IAllergy } from '../../interface/IAllergy';
import { vaccineArray } from '../utils/sort.test';
jest.mock('../../axios/api');

const allergyArray: IAllergy[] = [
  {
    id: -1,
    name: 'allery1',
    status: 'added',
  },
  {
    id: 2,
    name: 'allery2',
    status: 'edited',
  },
  {
    id: 3,
    name: 'allery3',
    status: 'deleted',
  },
];

describe('for allergy', () => {
  const body = {
    name: 'test allergy name',
    status: 'added',
  };
  it('should get proper response when addAllergy is called with required body', async () => {
    const input = body;

    const output = await addAllergy(body);

    const expectedOutput = body;
    expect(output.data).toEqual(expectedOutput);
  });

  it('should get array of vaccines as dummy, when getAllAllergiesByPatientId is called', async () => {
    const output = await getAllAllergiesByPatientId(1);

    const expectedOutput = vaccineArray;
    expect(output.data).toEqual(expectedOutput);
  });

  it('should get proper response when updateAllergy is called with required body', async () => {
    const input = { ...body, id: 1, vaccineId: 2 };

    const output = await updateAllergy(input);

    const expectedOutput = input;
    expect(output.data).toEqual(expectedOutput);
  });

  it('should get proper response when deleteAllergy is called without any body', async () => {
    const input = body;

    const output = await deleteAllergy(1);

    const expectedOutput = 'without any body';
    expect(output.data).toEqual(expectedOutput);
  });

  it('should get proper response when sentArrayOfAlleryToBackend is called with array of allergy of reduxstore', async () => {
    const input = allergyArray;

    const output = await sentArrayOfAllergyToBackend(input, 1);

    const expectedResponseArray = [
      { ...allergyArray[0], status: undefined, vaccineId: 1 },
      { ...allergyArray[1], status: undefined, vaccineId: 1 },
      'without any body',
    ];
    expect(output).toEqual(expectedResponseArray);
  });
});
