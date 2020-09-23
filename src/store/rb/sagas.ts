import {
  FETCH_ACCOUNTING_SYSTEM,
  FETCH_ATTACH_TYPES,
  FETCH_EVENT_TYPES,
  FETCH_INVALID_DOCUMENTS,
  FETCH_INVALID_REASONS,
  FETCH_KLADR,
  FETCH_KLADR_NESTED,
  FETCH_KLADR_STREETS,
  FETCH_ORGANISATIONS,
  FETCH_PERSONS,
} from './types';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import RbService from '../../services/RbService';
import { fetchPatientsError } from '../patients/actions';
import { AxiosResponse } from 'axios';
import RbPersonResponse from '../../interfaces/responses/rb/rbPerson';
import {
  fetchAccountingSystemError,
  fetchAttachTypesError,
  fetchEventTypesError,
  fetchInvalidDocumentsError,
  fetchKladr,
  fetchKladrError,
  fetchKladrNestedError,
  fetchKladrNestedSuccess,
  fetchKladrStreetsError,
  fetchKladrStreetsSuccess,
  fetchKladrSuccess,
  fetchOrganisationsError,
  setRbAccountingSystem,
  setRbAttachTypes,
  setRbEventTypes,
  setRbInvalidDocuments,
  setRbInvalidReasons,
  setRbOrganisations,
  setRbPersons,
} from './actions';
import RbEventTypeResponse from '../../interfaces/responses/rb/rbEventType';
import EventType from '../../types/data/EventType';
import Person from '../../types/data/Person';
import RbOrganisationResponse from '../../interfaces/responses/rb/rbOrganisation';
import RbInvalidReasonResponse from '../../interfaces/responses/rb/rbInvalidReason';
import RbInvalidDocumentTypeResponse from '../../interfaces/responses/rb/rbInvalidDocumentType';
import RbAccountingSystemResponse from '../../interfaces/responses/rb/rbAccountingSystem';
import RbAttachTypeResponse from '../../interfaces/responses/rb/rbAttachType';
import RbKladrResponse from '../../interfaces/responses/rb/rbKladr';

function* asyncFetchPersons() {
  try {
    const persons: AxiosResponse<RbPersonResponse[]> = yield call(
      RbService.fetchPersons,
    );
    if (persons.data) {
      const formattedData: Person[] = persons.data.map((item) => ({
        id: item.id,
        createDatetime: item.createDatetime,
        createPersonId: item.createPerson_id,
        modifyDatetime: item.modifyDatetime,
        modifyPersonId: item.modifyPerson_id,
        code: item.code,
        lastName: item.lastName,
        firstName: item.firstName,
        patrName: item.patrName,
        postId: item.post_id,
        specialityId: item.speciality_id,
      }));
      yield put(setRbPersons(formattedData));
    }
  } catch (e) {
    yield put(fetchPatientsError());
  } finally {
  }
}

function* asyncFetchEventTypes() {
  try {
    const persons: AxiosResponse<RbEventTypeResponse[]> = yield call(
      RbService.fetchEventTypes,
    );
    if (persons.data) {
      const formattedData: EventType[] = persons.data.map((item) => ({
        id: item.id,
        createDatetime: item.createDatetime,
        createPersonId: item.createPerson_id,
        eventTypeId: item.eventType_id,
        code: item.code,
        name: item.name,
      }));
      yield put(setRbEventTypes(formattedData));
    }
  } catch (e) {
    yield put(fetchEventTypesError());
  } finally {
  }
}

function* asyncFetchOrganisations(action: FETCH_ORGANISATIONS) {
  try {
    const organisations: AxiosResponse<RbOrganisationResponse[]> = yield call(
      RbService.fetchOrganisation,
    );
    if (organisations.data) {
      const formattedData = organisations.data.map((item) => ({
        ...item,
      }));
      yield put(setRbOrganisations(formattedData));
    }
  } catch (e) {
    console.log(e);
    yield put(fetchOrganisationsError());
  }
}

function* asyncFetchInvalidReasons(action: FETCH_INVALID_REASONS) {
  try {
    const reasons: AxiosResponse<RbInvalidReasonResponse[]> = yield call(
      RbService.fetchInvalidReasons,
    );
    if (reasons.data) {
      const formattedData = reasons.data.map((item) => ({
        ...item,
      }));
      yield put(setRbInvalidReasons(formattedData));
    }
  } catch (e) {
    yield put(fetchInvalidDocumentsError());
  }
}

function* asyncFetchInvalidDocuments(actions: FETCH_INVALID_DOCUMENTS) {
  try {
    const docs: AxiosResponse<RbInvalidDocumentTypeResponse[]> = yield call(
      RbService.fetchInvalidDocumentTypes,
    );
    if (docs.data) {
      const formattedData = docs.data.map((item) => ({
        id: item.id,
        name: item.name,
        code: item.code,
      }));
      yield put(setRbInvalidDocuments(formattedData));
    }
  } catch (e) {
    yield put(fetchInvalidDocumentsError());
  }
}

function* asyncFetchAccountingSystem(actions: FETCH_INVALID_DOCUMENTS) {
  try {
    const accounts: AxiosResponse<RbAccountingSystemResponse[]> = yield call(
      RbService.fetchAccountingSystem,
    );
    if (accounts.data) {
      const formattedData = accounts.data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      yield put(setRbAccountingSystem(formattedData));
    }
  } catch (e) {
    yield put(fetchAccountingSystemError());
  }
}

function* asyncFetchAttachTypes() {
  try {
    const attachTypes: AxiosResponse<RbAttachTypeResponse[]> = yield call(
      RbService.fetchAttachTypes,
    );
    if (attachTypes.data) {
      const formattedData = attachTypes.data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      yield put(setRbAttachTypes(formattedData));
    }
  } catch (e) {
    yield put(fetchAttachTypesError());
  }
}

function* asyncFetchKladrNested(action: FETCH_KLADR) {
  try {
    let nestedKladr: AxiosResponse<RbKladrResponse[]> = yield call(
      RbService.getRegionList,
      action.payload,
    );
    if (nestedKladr.data) {
      const formattedData = nestedKladr.data.map((item) => ({
        id: item.CODE,
        name: item.NAME,
        prefix: item.prefix,
        socr: item.SOCR,
        infis: item.infis,
      }));
      yield put(fetchKladrNestedSuccess(formattedData));
    }
  } catch (e) {
    yield put(fetchKladrNestedError());
  }
}

function* asyncFetchKladr(action: FETCH_KLADR) {
  try {
    let kladr: AxiosResponse<RbKladrResponse[]> = yield call(
      RbService.getRegionList,
    );
    if (kladr.data) {
      const formattedData = kladr.data.map((item) => ({
        id: item.CODE,
        name: item.NAME,
        prefix: item.prefix,
        socr: item.SOCR,
        infis: item.infis,
      }));
      yield put(fetchKladrSuccess(formattedData));
    }
  } catch (e) {
    yield put(fetchKladrError());
  }
}

function* asyncFetchKladrStreets(action: FETCH_KLADR_STREETS) {
  try {
    let streets: AxiosResponse<RbKladrResponse[]> = yield call(
      RbService.getRegionStreets,
      action.payload,
    );
    if (streets.data) {
      const formattedData = streets.data.map((item) => ({
        id: item.CODE,
        name: item.NAME,
        socr: item.SOCR,
        infis: item.infis,
      }));
      yield put(fetchKladrStreetsSuccess(formattedData));
    }
  } catch (e) {
    yield put(fetchKladrStreetsError());
  }
}

function* watchAsync() {
  yield takeEvery(FETCH_PERSONS, asyncFetchPersons);
  yield takeEvery(FETCH_EVENT_TYPES, asyncFetchEventTypes);
  yield takeEvery(FETCH_ORGANISATIONS, asyncFetchOrganisations);
  yield takeEvery(FETCH_INVALID_REASONS, asyncFetchInvalidReasons);
  yield takeEvery(FETCH_INVALID_DOCUMENTS, asyncFetchInvalidDocuments);
  yield takeEvery(FETCH_ACCOUNTING_SYSTEM, asyncFetchAccountingSystem);
  yield takeEvery(FETCH_ATTACH_TYPES, asyncFetchAttachTypes);
  yield takeEvery(FETCH_KLADR, asyncFetchKladr);
  yield takeEvery(FETCH_KLADR_NESTED, asyncFetchKladrNested);
}

export default function* rbSaga() {
  yield all([fork(watchAsync)]);
}
