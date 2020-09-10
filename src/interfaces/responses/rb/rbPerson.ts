export default interface RbPersonResponse {
  id: number;
  createDatetime: string;
  createPerson_id: number;
  modifyDatetime: string;
  modifyPerson_id: number;
  deleted: 0 | 1;
  code: string;
  federalCode: string;
  regionalCode: string;
  lastName: string;
  firstName: string;
  patrName: string;
  post_id: number | null;
  speciality_id: number | null;
  org_id: number | null;
  orgStructure_id: number | null;
  office: string;
  office2: string;
}
