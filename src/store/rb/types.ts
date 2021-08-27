import Person from '../../types/data/Person';
import Organisation from '../../types/data/Organisation';
import AttachType from '../../types/data/AttachType';
import PolicyType from '../../types/data/PolicyType';
import PolicyKind from '../../types/data/PolicyKind';
import PatientContactType from '../../types/data/PatientContactType';
import PatientDocumentType from '../../types/data/PatientDocumentType';
import DetachmentReason from "../../types/data/DetachmentReason";

export const FETCH_PERSONS = 'FETCH_PERSONS';
export const FETCH_PERSONS_ERROR = 'FETCH_PERSONS_ERROR';
export const FETCH_PERSONS_SUCCESS = 'FETCH_PERSONS_SUCCESS';
export const SET_RB_PERSONS = 'SET_RB_PERSONS';

export const FETCH_EVENT_TYPES = 'FETCH_EVENT_TYPES';
export const FETCH_EVENT_TYPES_ERROR = 'FETCH_EVENT_TYPES_ERROR';
export const FETCH_EVENT_TYPES_SUCCESS = 'FETCH_EVENT_TYPES_SUCCESS';
export const SET_RB_EVENT_TYPES = 'SET_RB_EVENT_TYPES';

export const FETCH_INVALID_REASONS = 'FETCH_INVALID_REASONS';
export const FETCH_INVALID_REASONS_ERROR = 'FETCH_INVALID_REASONS_ERROR';
export const FETCH_INVALID_REASONS_SUCCESS = 'FETCH_INVALID_REASONS_SUCCESS';
export const SET_RB_INVALID_REASONS = 'SET_RB_INVALID_REASONS';

export const FETCH_ORGANISATIONS = 'FETCH_ORGANISATIONS';
export const FETCH_ORGANISATIONS_ERROR = 'FETCH_ORGANISATIONS_ERROR';
export const FETCH_ORGANISATIONS_SUCCESS = 'FETCH_ORGANISATIONS_SUCCESS';
export const SET_RB_ORGANISATIONS = 'SET_RB_ORGANISATIONS';

export const FETCH_INVALID_DOCUMENTS = 'FETCH_INVALID_DOCUMENTS';
export const FETCH_INVALID_DOCUMENTS_ERROR = 'FETCH_INVALID_DOCUMENTS_ERROR';
export const FETCH_INVALID_DOCUMENTS_SUCCESS =
  'FETCH_INVALID_DOCUMENTS_SUCCESS';
export const SET_RB_INVALID_DOCUMENTS = 'SET_RB_INVALID_DOCUMENTS';

export const FETCH_ACCOUNTING_SYSTEM = 'FETCH_ACCOUNTING_SYSTEM';
export const FETCH_ACCOUNTING_SYSTEM_ERROR = 'FETCH_ACCOUNTING_SYSTEM_ERROR';
export const FETCH_ACCOUNTING_SYSTEM_SUCCESS =
  'FETCH_ACCOUNTING_SYSTEM_SUCCESS';
export const SET_RB_ACCOUNTING_SYSTEM = 'SET_RB_ACCOUNTING_SYSTEM';

export const FETCH_ATTACH_TYPES = 'FETCH_ATTACH_TYPES';
export const FETCH_ATTACH_TYPES_ERROR = 'FETCH_ATTACH_TYPES_ERROR';
export const FETCH_ATTACH_TYPES_SUCCESS = 'FETCH_ATTACH_TYPES_SUCCESS';
export const SET_RB_ATTACH_TYPES = 'SET_RB_ATTACH_TYPES';

export const FETCH_DETACHMENT_REASONS = 'FETCH_DETACHMENT_REASONS';
export const FETCH_DETACHMENT_REASONS_ERROR = 'FETCH_DETACHMENT_REASONS_ERROR';
export const FETCH_DETACHMENT_REASONS_SUCCESS = 'FETCH_DETACHMENT_REASONS_SUCCESS';
export const SET_RB_DETACHMENT_REASONS = 'SET_RB_DETACHMENT_REASONS';

export const FETCH_POLICY_TYPES = 'FETCH_POLICY_TYPES';
export const FETCH_POLICY_TYPES_ERROR = 'FETCH_POLICY_TYPES_ERROR';
export const FETCH_POLICY_TYPES_SUCCESS = 'FETCH_POLICY_TYPES_SUCCESS';

export const FETCH_POLICY_KINDS = 'FETCH_POLICY_TYPES';
export const FETCH_POLICY_KINDS_ERROR = 'FETCH_POLICY_KINDS_ERROR';
export const FETCH_POLICY_KINDS_SUCCESS = 'FETCH_POLICY_KINDS_SUCCESS';

export const FETCH_CONTACT_TYPES = 'FETCH_CONTACT_TYPES_TYPES';
export const FETCH_CONTACT_TYPES_ERROR = 'FETCH_CONTACT_TYPES_ERROR';
export const FETCH_CONTACT_TYPES_SUCCESS = 'FETCH_CONTACT_TYPES_SUCCESS';

export const FETCH_PATIENT_DOCUMENT_TYPES = 'FETCH_PATIENT_DOCUMENT_TYPES';
export const FETCH_PATIENT_DOCUMENT_TYPES_ERROR =
  'FETCH_PATIENT_DOCUMENT_TYPES_ERROR';
export const FETCH_PATIENT_DOCUMENT_TYPES_SUCCESS =
  'FETCH_PATIENT_DOCUMENT_TYPES_SUCCESS';

export interface FETCH_PERSONS {
  type: typeof FETCH_PERSONS;
}

export interface FETCH_PERSONS_ERROR {
  type: typeof FETCH_PERSONS_ERROR;
}

export interface FETCH_PERSONS_SUCCESS {
  type: typeof FETCH_PERSONS_SUCCESS;
}

export interface FETCH_EVENT_TYPES {
  type: typeof FETCH_EVENT_TYPES;
}

export interface FETCH_EVENT_TYPES_ERROR {
  type: typeof FETCH_EVENT_TYPES_ERROR;
}

export interface FETCH_EVENT_TYPES_SUCCESS {
  type: typeof FETCH_EVENT_TYPES_SUCCESS;
}

export interface SET_RB_PERSONS {
  type: typeof SET_RB_PERSONS;
  payload: Person[];
}

export interface FETCH_INVALID_REASONS {
  type: typeof FETCH_INVALID_REASONS;
}

export interface FETCH_INVALID_REASONS_ERROR {
  type: typeof FETCH_INVALID_REASONS_ERROR;
}

export interface FETCH_INVALID_REASONS_SUCCESS {
  type: typeof FETCH_INVALID_REASONS;
}

export interface FETCH_ORGANISATIONS {
  type: typeof FETCH_ORGANISATIONS;
}

export interface FETCH_ORGANISATIONS_ERROR {
  type: typeof FETCH_ORGANISATIONS_ERROR;
}

export interface FETCH_ORGANISATIONS_SUCCESS {
  type: typeof FETCH_ORGANISATIONS_SUCCESS;
}

export interface SET_RB_ORGANISATIONS {
  type: typeof SET_RB_ORGANISATIONS;
  payload: Organisation[];
}

export interface FETCH_INVALID_DOCUMENTS {
  type: typeof FETCH_INVALID_DOCUMENTS;
}

export interface FETCH_INVALID_DOCUMENTS_ERROR {
  type: typeof FETCH_INVALID_DOCUMENTS_ERROR;
}

export interface FETCH_INVALID_DOCUMENTS_SUCCESS {
  type: typeof FETCH_INVALID_DOCUMENTS_SUCCESS;
}

export interface FETCH_ACCOUNTING_SYSTEM {
  type: typeof FETCH_ACCOUNTING_SYSTEM;
}

export interface FETCH_ACCOUNTING_SYSTEM_ERROR {
  type: typeof FETCH_ACCOUNTING_SYSTEM_ERROR;
}

export interface FETCH_ACCOUNTING_SYSTEM_SUCCESS {
  type: typeof FETCH_ACCOUNTING_SYSTEM_SUCCESS;
}

export interface FETCH_ATTACH_TYPES {
  type: typeof FETCH_ATTACH_TYPES;
}
export interface FETCH_ATTACH_TYPES_ERROR {
  type: typeof FETCH_ATTACH_TYPES_ERROR;
}

export interface FETCH_ATTACH_TYPES_SUCCESS {
  type: typeof FETCH_ATTACH_TYPES_SUCCESS;
}

export interface SET_RB_ATTACH_TYPES {
  type: typeof SET_RB_ATTACH_TYPES;
  payload: AttachType[];
}

export interface FETCH_DETACHMENT_REASONS {
  type: typeof FETCH_DETACHMENT_REASONS;
}

export interface FETCH_DETACHMENT_REASONS_ERROR {
  type: typeof FETCH_DETACHMENT_REASONS_ERROR;
}

export interface FETCH_DETACHMENT_REASONS_SUCCESS {
  type: typeof FETCH_DETACHMENT_REASONS_SUCCESS;
}

export interface SET_RB_DETACHMENT_REASONS {
  type: typeof SET_RB_DETACHMENT_REASONS;
  payload: DetachmentReason[];
}

export interface FETCH_POLICY_TYPES {
  type: typeof FETCH_POLICY_TYPES;
}

export interface FETCH_POLICY_TYPES_ERROR {
  type: typeof FETCH_POLICY_TYPES_ERROR;
}

export interface FETCH_POLICY_TYPES_SUCCESS {
  type: typeof FETCH_POLICY_TYPES_SUCCESS;
  payload: PolicyType[];
}

export interface FETCH_POLICY_KINDS {
  type: typeof FETCH_POLICY_KINDS;
}

export interface FETCH_POLICY_KINDS_ERROR {
  type: typeof FETCH_POLICY_KINDS_ERROR;
}

export interface FETCH_POLICY_KINDS_SUCCESS {
  type: typeof FETCH_POLICY_KINDS_SUCCESS;
  payload: PolicyKind[];
}

export interface FETCH_CONTACT_TYPES {
  type: typeof FETCH_CONTACT_TYPES;
}

export interface FETCH_CONTACT_TYPES_ERROR {
  type: typeof FETCH_CONTACT_TYPES_ERROR;
}

export interface FETCH_CONTACT_TYPES_SUCCESS {
  type: typeof FETCH_CONTACT_TYPES_SUCCESS;
  payload: PatientContactType[];
}

export interface FETCH_PATIENT_DOCUMENT_TYPES {
  type: typeof FETCH_PATIENT_DOCUMENT_TYPES;
}

export interface FETCH_PATIENT_DOCUMENT_TYPES_ERROR {
  type: typeof FETCH_PATIENT_DOCUMENT_TYPES_ERROR;
}

export interface FETCH_PATIENT_DOCUMENT_TYPES_SUCCESS {
  type: typeof FETCH_PATIENT_DOCUMENT_TYPES_SUCCESS;
  payload: PatientDocumentType[];
}

export type RbActionsType =
  | FETCH_PERSONS
  | FETCH_PERSONS_ERROR
  | FETCH_PERSONS_SUCCESS
  | FETCH_EVENT_TYPES
  | FETCH_EVENT_TYPES_ERROR
  | SET_RB_PERSONS
  | FETCH_EVENT_TYPES_SUCCESS
  | FETCH_INVALID_REASONS
  | FETCH_INVALID_REASONS_ERROR
  | FETCH_INVALID_REASONS_SUCCESS
  | FETCH_ORGANISATIONS
  | FETCH_ORGANISATIONS_ERROR
  | FETCH_ORGANISATIONS_SUCCESS
  | SET_RB_ORGANISATIONS
  | FETCH_INVALID_DOCUMENTS
  | FETCH_INVALID_DOCUMENTS_ERROR
  | FETCH_INVALID_DOCUMENTS_SUCCESS
  | FETCH_ACCOUNTING_SYSTEM
  | FETCH_ACCOUNTING_SYSTEM_ERROR
  | FETCH_ACCOUNTING_SYSTEM_SUCCESS
  | FETCH_ATTACH_TYPES
  | FETCH_ATTACH_TYPES_ERROR
  | FETCH_ATTACH_TYPES_SUCCESS
  | SET_RB_ATTACH_TYPES
  | FETCH_DETACHMENT_REASONS
  | FETCH_DETACHMENT_REASONS_ERROR
  | FETCH_DETACHMENT_REASONS_SUCCESS
  | SET_RB_DETACHMENT_REASONS
  | FETCH_POLICY_TYPES
  | FETCH_POLICY_TYPES_ERROR
  | FETCH_POLICY_TYPES_SUCCESS
  | FETCH_POLICY_KINDS
  | FETCH_POLICY_KINDS_ERROR
  | FETCH_POLICY_KINDS_SUCCESS
  | FETCH_CONTACT_TYPES
  | FETCH_CONTACT_TYPES_ERROR
  | FETCH_CONTACT_TYPES_SUCCESS
  | FETCH_PATIENT_DOCUMENT_TYPES
  | FETCH_PATIENT_DOCUMENT_TYPES_ERROR
  | FETCH_PATIENT_DOCUMENT_TYPES_SUCCESS;
