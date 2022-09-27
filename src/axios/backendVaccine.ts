import { IVaccineToInsert } from '../interface/IVaccine';
import api from './api';
const ENDPOINT_VACCINE= '/vaccine/';

/**
 *
 * @param body request's body for adding new vaccine
 * @returns response from server
 */
export async function addVaccine(body: IVaccineToInsert): Promise<any> {
  const response = await api.post(ENDPOINT_VACCINE, body);
  return response.data;
}

/**
 *
 * @returns all of user's vaccines from vaccines table
 */
export async function readAllVaccines(): Promise<any> {
  const response = await api.get(ENDPOINT_VACCINE);
  return response.data;
}

/**
 *
 * @param body request's body for editing existing vaccine
 * @returns response from server
 */
export async function editVaccine(body: IVaccineToInsert, vaccineId: number): Promise<any> {
  const response = await api.put(ENDPOINT_VACCINE + vaccineId, body);
  return response.data;
}

/**
 *
 * @param vaccineId key for targeting vaccine to delete from vaccine's table
 * @returns response from server
 */
export async function deleteVaccine(vaccineId: number): Promise<any> {
  const response = await api.delete(ENDPOINT_VACCINE + vaccineId);
  return response.data;
}
