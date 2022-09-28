import { addVaccine, deleteVaccine, editVaccine, readAllVaccines } from '../../axios/backendVaccine';
import { vaccineArray } from '../constants';
jest.mock('../../axios/api');

describe('for vaccine', () => {
  const body = vaccineArray[0];
  //   delete body.id;
  it('should get proper response when addVaccine is called with required body', async () => {
    const input = body;

    const output = await addVaccine(vaccineArray[0]);

    const expectedOutput = body;
    expect(output.data).toEqual(expectedOutput);
  });

  it('should get array of vaccines when readAllVaccines is called', async () => {
    const output = await readAllVaccines();

    const expectedOutput = vaccineArray;
    expect(output.data).toEqual(expectedOutput);
  });

  it('should get proper response when editVaccine is called with required body', async () => {
    const input = body;

    const output = await editVaccine(body, body.id);

    const expectedOutput = body;
    expect(output.data).toEqual(expectedOutput);
  });

  it('should get proper response when deleteVaccine is called without any body', async () => {
    const input = body;

    const output = await deleteVaccine(body.id);

    const expectedOutput = 'without any body';
    expect(output.data).toEqual(expectedOutput);
  });
});
