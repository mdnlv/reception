import Patient from '../../types/data/Patient';

export const SET_CURRENT_PATIENT = 'SET_CURRENT_PATIENT';

export const SET_PATIENTS = 'SET_PATIENTS';
export const FETCH_PATIENTS = 'FETCH_PATIENTS';
export const FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS';
export const FETCH_PATIENTS_ERROR = 'FETCH_PATIENTS_ERROR';

export const SET_LOADING = 'SET_LOADING';
export const SET_FOUND_PATIENTS = 'SET_FOUND_PATIENTS';

export const DETAILED_QUERY_PATIENTS = 'DETAILED_QUERY_PATIENTS';
export const DETAILED_QUERY_PATIENTS_ERROR = 'DETAILED_QUERY_PATIENTS_ERROR';
export const DETAILED_QUERY_PATIENTS_SUCCESS =
  'DETAILED_QUERY_PATIENTS_SUCCESS';

export const QUERY_PATIENTS = 'SET_QUERY_PATIENTS';
export const QUERY_PATIENTS_SUCCESS = 'QUERY_PATIENTS_SUCCESS';
export const QUERY_PATIENTS_ERROR = 'QUERY_PATIENTS_ERROR';

export interface QueryPatientsFilters {
  tempInvalidDocumentBegDate: string;
  tempInvalidDocumentEndDate: string;
  tempInvalidDocumentSerial: string;
  tempInvalidDocumentNumber: string;
  tempInvalidDocumentTypeId: number;
  tempInvalidReasonId: number;
  createPersonId: number;
  modifyPersonId: number;
  begModifyDatetime: string;
  endModifyDatetime: string;
  begBirthDate: string;
  endBirthDate: string;
  isEmptyAddress: 0 | 1;
  areaTypeId: number;
  areaOrgStructureId: number;
  bedProfileTypeId: 0 | 1 | 2 | 3 | 4;
  bedProfileOrgStructureId: number;
  isAttachment: 0 | 1;
  attachmentCategoryId: 0 | 1 | 2 | 3;
  attachmentTypeId: number;
  isAttachNonBase: 0 | 1;
  attachmentOrganisationId: number;
  begDateRPFConfirmed: string;
  endDateRPFConfirmed: string;
  isRPFUnconfirmed: 0 | 1;
  isOncologyForm90: 0 | 1;
  isClientExamPlan: 0 | 1;
  clientExamPlanKindId: 0 | 1 | 2;
  clientExamPlanYear: number;
  clientExamPlanQuarter: number;
  identifierSystemId: number;
  identifier: string;
}

export interface SET_CURRENT_PATIENT {
  type: typeof SET_CURRENT_PATIENT;
  payload: number;
}

export interface SET_PATIENTS {
  type: typeof SET_PATIENTS;
  payload: Patient[];
}

export interface FETCH_PATIENTS {
  type: typeof FETCH_PATIENTS;
  payload: {
    limit?: number;
    offset?: number;
  };
}

export interface FETCH_PATIENTS_ERROR {
  type: typeof FETCH_PATIENTS_ERROR;
}

export interface FETCH_PATIENTS_SUCCESS {
  type: typeof FETCH_PATIENTS_SUCCESS;
}

export interface SET_LOADING {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface SET_FOUND_PATIENTS {
  type: typeof SET_FOUND_PATIENTS;
  payload: Patient[];
}

export interface DETAILED_QUERY_PATIENTS {
  type: typeof DETAILED_QUERY_PATIENTS;
  payload: string;
}

export interface DETAILED_QUERY_PATIENTS_ERROR {
  type: typeof DETAILED_QUERY_PATIENTS_ERROR;
}

export interface DETAILED_QUERY_PATIENTS_SUCCESS {
  type: typeof DETAILED_QUERY_PATIENTS_SUCCESS;
}

export interface QUERY_PATIENTS {
  type: typeof QUERY_PATIENTS;
  payload: QueryPatientsFilters;
}

export interface QUERY_PATIENTS_ERROR {
  type: typeof QUERY_PATIENTS_ERROR;
}

export interface QUERY_PATIENTS_SUCCESS {
  type: typeof QUERY_PATIENTS_SUCCESS;
}

export type PatientsActionsType =
  | SET_PATIENTS
  | SET_CURRENT_PATIENT
  | FETCH_PATIENTS
  | FETCH_PATIENTS_ERROR
  | FETCH_PATIENTS_SUCCESS
  | SET_LOADING
  | SET_FOUND_PATIENTS
  | DETAILED_QUERY_PATIENTS
  | DETAILED_QUERY_PATIENTS_ERROR
  | DETAILED_QUERY_PATIENTS_SUCCESS
  | QUERY_PATIENTS
  | QUERY_PATIENTS_ERROR
  | QUERY_PATIENTS_SUCCESS;
