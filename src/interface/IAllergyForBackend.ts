export interface IAllergyForBackend {
  id: number;
  name: string;
  vaccineId: number;
}
export type IAllergyForBackendToInsert = Omit<IAllergyForBackend, 'id'>;
