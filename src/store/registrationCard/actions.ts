import {
  FETCH_KLADR,
  FETCH_KLADR_ERROR,
  FETCH_KLADR_NESTED,
  FETCH_KLADR_NESTED_ERROR,
  FETCH_KLADR_NESTED_SUCCESS,
  FETCH_KLADR_STREETS,
  FETCH_KLADR_STREETS_ERROR,
  FETCH_KLADR_STREETS_SUCCESS,
  FETCH_KLADR_SUCCESS,
  FetchKladrItems,
  KLADR_LOADING,
  KLADR_NESTED_LOADING,
  KLADR_STREETS_LOADING,
  KladrDocType,
  KladrItemsSuccessPayload,
  KladrStreetsSuccessPayload,
  RegistrationCardState,
  RegistrationCardStateType,
  SET_FORM_SECTION,
} from './types';
import KladrStreet from '../../types/data/KladrStreet';

export function setFormSection(
  formState: RegistrationCardState,
): RegistrationCardStateType {
  return {
    type: SET_FORM_SECTION,
    payload: formState,
  };
}

export function fetchKladr(payload?: FetchKladrItems) {
  return {
    type: FETCH_KLADR,
    payload,
  };
}

export function fetchKladrError() {
  return {
    type: FETCH_KLADR_ERROR,
  };
}

export function fetchKladrSuccess(payload: KladrItemsSuccessPayload) {
  return {
    type: FETCH_KLADR_SUCCESS,
    payload,
  };
}

export function fetchKladrNested(payload: FetchKladrItems) {
  return {
    type: FETCH_KLADR_NESTED,
    payload,
  };
}

export function fetchKladrNestedError() {
  return {
    type: FETCH_KLADR_NESTED_ERROR,
  };
}

export function fetchKladrNestedSuccess(payload: KladrItemsSuccessPayload) {
  return {
    type: FETCH_KLADR_NESTED_SUCCESS,
    payload,
  };
}

export function fetchKladrStreets(payload: FetchKladrItems) {
  return {
    type: FETCH_KLADR_STREETS,
    payload,
  };
}

export function fetchKladrStreetsError() {
  return {
    type: FETCH_KLADR_STREETS_ERROR,
  };
}

export function fetchKladrStreetsSuccess(payload: KladrStreetsSuccessPayload) {
  return {
    type: FETCH_KLADR_STREETS_SUCCESS,
    payload,
  };
}

export function toggleLoadingKladr(state: boolean) {
  return {
    type: KLADR_LOADING,
    payload: state,
  };
}

export function toggleLoadingKladrNested(state: boolean) {
  return {
    type: KLADR_NESTED_LOADING,
    payload: state,
  };
}

export function toggleLoadingKladrStreets(state: boolean) {
  return {
    type: KLADR_STREETS_LOADING,
    payload: state,
  };
}
