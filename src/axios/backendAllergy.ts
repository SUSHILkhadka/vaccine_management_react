import { IAllergy } from '../interface/IAllergy';
import { IAllergyForBackend } from '../interface/IAllergyForBackend';
import api from './api';

const routeName = '/allergy/';

/**
 *
 * @param body request's body for adding new vaccine
 * @returns response from server
 */
export async function addAllergy(body: any): Promise<any> {
  const response = await api.post(routeName, body);
  return response.data;
}

/**
 *
 * @param vaccineId id of vaccine whose allergies are to be listed
 * @returns list of alleriges of vaccine
 */
export async function getAllAllergiesByPatientId(
  vaccineId: number
): Promise<any> {
  const response = await api.get(routeName + vaccineId);
  return response.data;
}

/**
 *
 * @param body request's body for editing existing allergy
 * @param allergyId for targeting specific allergy from allergy's table
 * @returns response from server
 */
export async function updateAllergy(body: IAllergyForBackend): Promise<any> {
  const response = await api.put(routeName + body.id, body);
  return response.data;
}

/**
 *
 * @param allergyId key for targeting allergy to delete from allergy's table
 * @returns response from server
 */
export async function deleteAllergy(allergyId: number): Promise<any> {
  const response = await api.delete(routeName + allergyId);
  return response.data;
}

export async function addArrayOfAllergy(
  array: IAllergy[],
  vaccineId: number
): Promise<any> {
  for (let i = 0; i < array.length; i++) {
    const body = {
      name: array[i].name,
      vaccineId: vaccineId,
    };
    const response = await addAllergy(body);
  }
}

export async function sentArrayOfAllergyToBackend(
  array: IAllergy[],
  vaccineId: number
): Promise<any> {
  let responseArray=[]

  for (let i = 0; i < array.length; i++) {
    const body = {
      id: array[i].id,
      name: array[i].name,
      vaccineId: vaccineId,
    };


    if (array[i].status === 'added') {
      const response = await addAllergy(body);
      responseArray.push(response.data)
    } else if (array[i].status === 'edited') {
      const response =await updateAllergy(body);
      responseArray.push(response.data)

    } else if (array[i].status === 'deleted') {
      const response =await deleteAllergy(body.id);
      responseArray.push(response.data)
    }
  }
  return responseArray;
}
