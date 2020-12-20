import {
  FETCH_ACCOUNTING_SYSTEM,
  FETCH_ACCOUNTING_SYSTEM_ERROR,
  FETCH_ACCOUNTING_SYSTEM_SUCCESS,
  FETCH_ATTACH_TYPES,
  FETCH_ATTACH_TYPES_ERROR,
  FETCH_ATTACH_TYPES_SUCCESS,
  FETCH_CONTACT_TYPES,
  FETCH_CONTACT_TYPES_ERROR,
  FETCH_CONTACT_TYPES_SUCCESS,
  FETCH_EVENT_TYPES,
  FETCH_EVENT_TYPES_ERROR,
  FETCH_EVENT_TYPES_SUCCESS,
  FETCH_INVALID_DOCUMENTS,
  FETCH_INVALID_DOCUMENTS_ERROR,
  FETCH_INVALID_DOCUMENTS_SUCCESS,
  FETCH_INVALID_REASONS,
  FETCH_INVALID_REASONS_ERROR,
  FETCH_INVALID_REASONS_SUCCESS,
  FETCH_ORGANISATIONS,
  FETCH_ORGANISATIONS_ERROR,
  FETCH_ORGANISATIONS_SUCCESS,
  FETCH_PATIENT_DOCUMENT_TYPES,
  FETCH_PATIENT_DOCUMENT_TYPES_ERROR,
  FETCH_PATIENT_DOCUMENT_TYPES_SUCCESS,
  FETCH_PERSONS,
  FETCH_PERSONS_ERROR,
  FETCH_PERSONS_SUCCESS,
  FETCH_POLICY_KINDS,
  FETCH_POLICY_KINDS_ERROR,
  FETCH_POLICY_KINDS_SUCCESS,
  FETCH_POLICY_TYPES,
  FETCH_POLICY_TYPES_ERROR,
  FETCH_POLICY_TYPES_SUCCESS,
  SET_RB_ACCOUNTING_SYSTEM,
  SET_RB_ATTACH_TYPES,
  SET_RB_EVENT_TYPES,
  SET_RB_INVALID_DOCUMENTS,
  SET_RB_INVALID_REASONS,
  SET_RB_ORGANISATIONS,
  SET_RB_PERSONS,
} from './types';
import Person from '../../types/data/Person';
import EventType from '../../types/data/EventType';
import Organisation from '../../types/data/Organisation';
import InvalidReason from '../../types/data/InvalidReason';
import InvalidDocument from '../../types/data/InvalidDocument';
import AccountingSystemItem from '../../types/data/AccountinSystemItem';
import PatientContactType from '../../types/data/PatientContactType';
import PolicyKind from '../../types/data/PolicyKind';
import PolicyType from '../../types/data/PolicyType';
import PatientDocumentType from '../../types/data/PatientDocumentType';

export function fetchPersons() {
  return {
    type: FETCH_PERSONS,
  };
}

export function fetchPersonsError(action: FETCH_PERSONS) {
  return {
    type: FETCH_PERSONS_ERROR,
  };
}

export function fetchPersonsSuccess() {
  return {
    type: FETCH_PERSONS_SUCCESS,
  };
}

export function fetchEventTypes() {
  return {
    type: FETCH_EVENT_TYPES,
  };
}

export function fetchEventTypesError() {
  return {
    type: FETCH_EVENT_TYPES_ERROR,
  };
}

export function fetchEventTypesSuccess() {
  return {
    type: FETCH_EVENT_TYPES_SUCCESS,
  };
}

export function setRbPersons(persons: Person[]) {
  return {
    type: SET_RB_PERSONS,
    payload: persons,
  };
}

export function setRbEventTypes(events: EventType[]) {
  return {
    type: SET_RB_EVENT_TYPES,
    payload: events,
  };
}

export function fetchOrganisations() {
  return {
    type: FETCH_ORGANISATIONS,
  };
}

export function fetchOrganisationsError() {
  return {
    type: FETCH_ORGANISATIONS_ERROR,
  };
}

export function fetchOrganisationsSuccess() {
  return {
    type: FETCH_ORGANISATIONS_SUCCESS,
  };
}

export function setRbOrganisations(orgs: Organisation[]) {
  return {
    type: SET_RB_ORGANISATIONS,
    payload: orgs,
  };
}

export function fetchInvalidReasons() {
  return {
    type: FETCH_INVALID_REASONS,
  };
}

export function fetchInvalidReasonsError() {
  return {
    type: FETCH_INVALID_REASONS_ERROR,
  };
}

export function fetchInvalidReasonsSuccess() {
  return {
    type: FETCH_INVALID_REASONS_SUCCESS,
  };
}

export function setRbInvalidReasons(reasons: InvalidReason[]) {
  return {
    type: SET_RB_INVALID_REASONS,
    payload: reasons,
  };
}

export function fetchInvalidDocuments() {
  return {
    type: FETCH_INVALID_DOCUMENTS,
  };
}

export function fetchInvalidDocumentsError() {
  return {
    type: FETCH_INVALID_DOCUMENTS_ERROR,
  };
}

export function fetchInvalidDocumentsSuccess() {
  return {
    type: FETCH_INVALID_DOCUMENTS_SUCCESS,
  };
}

export function setRbInvalidDocuments(docs: InvalidDocument[]) {
  return {
    type: SET_RB_INVALID_DOCUMENTS,
    payload: docs,
  };
}

export function fetchAccountingSystem() {
  return {
    type: FETCH_ACCOUNTING_SYSTEM,
  };
}

export function fetchAccountingSystemError() {
  return {
    type: FETCH_ACCOUNTING_SYSTEM_ERROR,
  };
}

export function fetchAccountingSystemSuccess() {
  return {
    type: FETCH_ACCOUNTING_SYSTEM_SUCCESS,
  };
}

export function setRbAccountingSystem(accountItems: AccountingSystemItem[]) {
  return {
    type: SET_RB_ACCOUNTING_SYSTEM,
    payload: accountItems,
  };
}

export function fetchAttachTypes() {
  return {
    type: FETCH_ATTACH_TYPES,
  };
}

export function fetchAttachTypesError() {
  return {
    type: FETCH_ATTACH_TYPES_ERROR,
  };
}

export function fetchAttachTypesSuccess() {
  return {
    type: FETCH_ATTACH_TYPES_SUCCESS,
  };
}

export function setRbAttachTypes(accountItems: AccountingSystemItem[]) {
  return {
    type: SET_RB_ATTACH_TYPES,
    payload: accountItems,
  };
}

export function fetchPolicyTypes() {
  return {
    type: FETCH_POLICY_TYPES,
  };
}

export function fetchPolicyTypesError() {
  return {
    type: FETCH_POLICY_TYPES_ERROR,
  };
}

export function fetchPolicyTypesSuccess(types: PolicyType[]) {
  return {
    type: FETCH_POLICY_TYPES_SUCCESS,
    payload: types,
  };
}

export function fetchPolicyKinds() {
  return {
    type: FETCH_POLICY_KINDS,
  };
}

export function fetchPolicyKindsError() {
  return {
    type: FETCH_POLICY_KINDS_ERROR,
  };
}

export function fetchPolicyKindsSuccess(types: PolicyKind[]) {
  return {
    type: FETCH_POLICY_KINDS_SUCCESS,
    payload: types,
  };
}

export function fetchContactTypes() {
  return {
    type: FETCH_CONTACT_TYPES,
  };
}

export function fetchContactTypesError() {
  return {
    type: FETCH_CONTACT_TYPES_ERROR,
  };
}

export function fetchContactTypesSuccess(types: PatientContactType[]) {
  return {
    type: FETCH_CONTACT_TYPES_SUCCESS,
    payload: types,
  };
}

export function fetchPatientDocumentTypes() {
  return {
    type: FETCH_PATIENT_DOCUMENT_TYPES,
  };
}

export function fetchPatientDocumentTypesError() {
  return {
    type: FETCH_PATIENT_DOCUMENT_TYPES_ERROR,
  };
}

export function fetchPatientDocumentTypesSuccess(types: PatientDocumentType[]) {
  return {
    type: FETCH_PATIENT_DOCUMENT_TYPES_SUCCESS,
    payload: types,
  };
}
