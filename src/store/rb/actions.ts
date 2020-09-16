import {
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
  FETCH_PERSONS,
  FETCH_PERSONS_ERROR,
  FETCH_PERSONS_SUCCESS,
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
