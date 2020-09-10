export const FETCH_PERSONS = 'FETCH_PERSONS';
export const FETCH_PERSONS_ERROR = 'FETCH_PERSONS_ERROR';
export const FETCH_PERSONS_SUCCESS = 'FETCH_PERSONS_SUCCESS';
export const SET_RB_PERSONS = 'SET_RB_PERSONS';

export const FETCH_EVENT_TYPES = 'FETCH_EVENT_TYPES';
export const FETCH_EVENT_TYPES_ERROR = 'FETCH_EVENT_TYPES_ERROR';
export const FETCH_EVENT_TYPES_SUCCESS = 'FETCH_EVENT_TYPES_SUCCESS';
export const SET_RB_EVENT_TYPES = 'SET_RB_EVENT_TYPES';

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
  payload: any[];
}

export interface SET_RB_EVENT_TYPES {
  type: typeof SET_RB_EVENT_TYPES;
  payload: any[];
}

export type RbActionsType =
  | FETCH_PERSONS
  | FETCH_PERSONS_ERROR
  | FETCH_PERSONS_SUCCESS
  | FETCH_EVENT_TYPES
  | FETCH_EVENT_TYPES_ERROR
  | SET_RB_PERSONS
  | SET_RB_EVENT_TYPES
  | FETCH_EVENT_TYPES_SUCCESS;
