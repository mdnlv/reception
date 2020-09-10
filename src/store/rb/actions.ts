import {
  FETCH_EVENT_TYPES,
  FETCH_EVENT_TYPES_ERROR,
  FETCH_EVENT_TYPES_SUCCESS,
  FETCH_PERSONS,
  FETCH_PERSONS_ERROR,
  FETCH_PERSONS_SUCCESS,
  SET_RB_PERSONS,
} from './types';
import Person from '../../types/data/Person';
import EventType from '../../types/data/EventType';

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
    type: SET_RB_PERSONS,
    payload: events,
  };
}
