import {
  FETCH_ATTACH_TYPES,
  FETCH_ATTACH_TYPES_ERROR,
  FETCH_ATTACH_TYPES_SUCCESS,
  FETCH_DETACHMENT_REASONS,
  FETCH_DETACHMENT_REASONS_ERROR,
  FETCH_DETACHMENT_REASONS_SUCCESS,
  FETCH_SNILS_MISSING_REASONS,
  FETCH_SNILS_MISSING_REASONS_ERROR,
  FETCH_SNILS_MISSING_REASONS_SUCCESS,
  FETCH_POLICY_DISCHARGE_REASONS,
  FETCH_POLICY_DISCHARGE_REASONS_ERROR,
  FETCH_POLICY_DISCHARGE_REASONS_SUCCESS,
  FETCH_CONTACT_TYPES,
  FETCH_CONTACT_TYPES_ERROR,
  FETCH_CONTACT_TYPES_SUCCESS,
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
  SET_RB_DETACHMENT_REASONS,
  SET_SNILS_MISSING_REASONS,
  SET_RB_ORGANISATIONS,
  SET_RB_PERSONS,
  SET_POLICY_DISCHARGE_REASONS,
} from './types';
import Person from '../../types/data/Person';
import Organisation from '../../types/data/Organisation';
import PatientContactType from '../../types/data/PatientContactType';
import PolicyKind from '../../types/data/PolicyKind';
import PolicyType from '../../types/data/PolicyType';
import PatientDocumentType from '../../types/data/PatientDocumentType';
import DetachmentReason from "../../types/data/DetachmentReason";
import SNILSMissingReason from "../../types/data/SNILSMissingReason";
import PolicyDischargeReason from "../../types/data/PolicyDischargeReason";

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

export function setRbPersons(persons: Person[]) {
  return {
    type: SET_RB_PERSONS,
    payload: persons,
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

export function fetchDetachmentReasons() {
  return {
    type: FETCH_DETACHMENT_REASONS,
  };
}

export function fetchDetachmentReasonsError() {
  return {
    type: FETCH_DETACHMENT_REASONS_ERROR,
  };
}

export function fetchDetachmentReasonsSuccess() {
  return {
    type: FETCH_DETACHMENT_REASONS_SUCCESS,
  };
}

export function setRbDetachmentReasons(detachmentItems: DetachmentReason[]) {
  return {
    type: SET_RB_DETACHMENT_REASONS,
    payload: detachmentItems,
  };
}

export function fetchSNILSMissingReasons() {
  return {
    type: FETCH_SNILS_MISSING_REASONS,
  };
}

export function fetchSNILSMissingReasonsError() {
  return {
    type: FETCH_SNILS_MISSING_REASONS_ERROR,
  };
}

export function fetchSNILSMissingReasonsSuccess() {
  return {
    type: FETCH_SNILS_MISSING_REASONS_SUCCESS,
  };
}

export function setSNILSMissingReasons(detachmentItems: SNILSMissingReason[]) {
  return {
    type: SET_SNILS_MISSING_REASONS,
    payload: detachmentItems,
  };
}

export function fetchPolicyDischargeReasons() {
  return {
    type: FETCH_POLICY_DISCHARGE_REASONS,
  };
}

export function fetchPolicyDischargeReasonsError() {
  return {
    type: FETCH_POLICY_DISCHARGE_REASONS_ERROR,
  };
}

export function fetchPolicyDischargeReasonsSuccess() {
  return {
    type: FETCH_POLICY_DISCHARGE_REASONS_SUCCESS,
  };
}

export function setPolicyDischargeReasons(detachmentItems: PolicyDischargeReason[]) {
  return {
    type: SET_SNILS_MISSING_REASONS,
    payload: detachmentItems,
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
