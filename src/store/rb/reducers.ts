import {
  FETCH_CONTACT_TYPES_SUCCESS,
  FETCH_PATIENT_DOCUMENT_TYPES_SUCCESS,
  FETCH_POLICY_KINDS_SUCCESS,
  FETCH_POLICY_TYPES_SUCCESS,
  RbActionsType,
  SET_RB_ATTACH_TYPES,
  SET_RB_ORGANISATIONS,
  SET_RB_PERSONS,
  SET_RB_DETACHMENT_REASONS,
} from './types';
import Person from '../../types/data/Person';
import Organisation from '../../types/data/Organisation';
import AttachType from '../../types/data/AttachType';
import PolicyType from '../../types/data/PolicyType';
import PolicyKind from '../../types/data/PolicyKind';
import PatientContactType from '../../types/data/PatientContactType';
import PatientDocumentType from '../../types/data/PatientDocumentType';
import DetachmentReason from "../../types/data/DetachmentReason";

const initialState = {
  rbPersons: [] as Person[],
  rbOrganisations: [] as Organisation[],
  rbAttachTypes: [] as AttachType[],
  rbPolicyTypes: [] as PolicyType[],
  rbPolicyKinds: [] as PolicyKind[],
  rbContactTypes: [] as PatientContactType[],
  rbPatientDocumentsTypes: [] as PatientDocumentType[],
  rbDetachmentReason: [] as DetachmentReason[],
};

export default function RbReducer(state = initialState, action: RbActionsType) {
  switch (action.type) {
    case SET_RB_PERSONS:
      return {
        ...state,
        rbPersons: action.payload,
      };
    case SET_RB_ORGANISATIONS:
      return {
        ...state,
        rbOrganisations: action.payload,
      };
    case SET_RB_ATTACH_TYPES:
      return {
        ...state,
        rbAttachTypes: action.payload,
      };
    case SET_RB_DETACHMENT_REASONS:
      return {
        ...state,
        rbDetachmentReason: action.payload,
      };
    case FETCH_POLICY_KINDS_SUCCESS:
      return {
        ...state,
        rbPolicyKinds: action.payload,
      };
    case FETCH_POLICY_TYPES_SUCCESS:
      return {
        ...state,
        rbPolicyTypes: action.payload,
      };
    case FETCH_CONTACT_TYPES_SUCCESS:
      return {
        ...state,
        rbContactTypes: action.payload,
      };

    case FETCH_PATIENT_DOCUMENT_TYPES_SUCCESS:
      return {
        ...state,
        rbPatientDocumentsTypes: action.payload,
      };

    default:
      return state;
  }
}
