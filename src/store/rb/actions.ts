import {
  FETCH_ACCOUNTING_SYSTEM,
  FETCH_ACCOUNTING_SYSTEM_ERROR,
  FETCH_ACCOUNTING_SYSTEM_SUCCESS,
  FETCH_ATTACH_TYPES,
  FETCH_ATTACH_TYPES_ERROR,
  FETCH_ATTACH_TYPES_SUCCESS,
  FETCH_EVENT_TYPES,
  FETCH_EVENT_TYPES_ERROR,
  FETCH_EVENT_TYPES_SUCCESS,
  FETCH_INVALID_DOCUMENTS,
  FETCH_INVALID_DOCUMENTS_ERROR,
  FETCH_INVALID_DOCUMENTS_SUCCESS,
  FETCH_INVALID_REASONS,
  FETCH_INVALID_REASONS_ERROR,
  FETCH_INVALID_REASONS_SUCCESS,
  FETCH_KLADR,
  FETCH_KLADR_ERROR,
  FETCH_KLADR_NESTED,
  FETCH_KLADR_NESTED_ERROR,
  FETCH_KLADR_NESTED_SUCCESS,
  FETCH_KLADR_STREETS,
  FETCH_KLADR_STREETS_ERROR,
  FETCH_KLADR_STREETS_SUCCESS,
  FETCH_KLADR_SUCCESS,
  FETCH_ORGANISATIONS,
  FETCH_ORGANISATIONS_ERROR,
  FETCH_ORGANISATIONS_SUCCESS,
  FETCH_PERSONS,
  FETCH_PERSONS_ERROR,
  FETCH_PERSONS_SUCCESS,
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
import KladrItem from '../../types/data/KladrItem';
import KladrStreet from '../../types/data/KladrStreet';

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

export function fetchKladr(parent = '') {
  return {
    type: FETCH_KLADR,
    payload: parent,
  };
}

export function fetchKladrError() {
  return {
    type: FETCH_KLADR_ERROR,
  };
}

export function fetchKladrSuccess(kladrItems: KladrItem[]) {
  return {
    type: FETCH_KLADR_SUCCESS,
    payload: kladrItems,
  };
}

export function fetchKladrNested(parent: string) {
  return {
    type: FETCH_KLADR_NESTED,
    payload: parent,
  };
}

export function fetchKladrNestedError() {
  return {
    type: FETCH_KLADR_NESTED_ERROR,
  };
}

export function fetchKladrNestedSuccess(kladrItems: KladrItem[]) {
  return {
    type: FETCH_KLADR_NESTED_SUCCESS,
    payload: kladrItems,
  };
}

export function fetchKladrStreets(parent: string) {
  return {
    type: FETCH_KLADR_STREETS,
    payload: parent,
  };
}

export function fetchKladrStreetsError() {
  return {
    type: FETCH_KLADR_STREETS_ERROR,
  };
}

export function fetchKladrStreetsSuccess(kladrItems: KladrStreet[]) {
  return {
    type: FETCH_KLADR_STREETS_SUCCESS,
    payload: kladrItems,
  };
}
