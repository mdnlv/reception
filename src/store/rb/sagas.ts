import {
  FETCH_ACCOUNTING_SYSTEM,
  FETCH_ATTACH_TYPES,
  FETCH_DETACHMENT_REASONS,
  FETCH_CONTACT_TYPES,
  FETCH_EVENT_TYPES,
  FETCH_INVALID_DOCUMENTS,
  FETCH_INVALID_REASONS,
  FETCH_ORGANISATIONS,
  FETCH_PATIENT_DOCUMENT_TYPES,
  FETCH_PERSONS,
  FETCH_POLICY_KINDS,
  FETCH_POLICY_TYPES,
} from './types';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import RbService from '../../services/RbService';
// import { fetchPatientsError } from '../patients/actions';
import { AxiosResponse } from 'axios';
import RbPersonResponse from '../../interfaces/responses/rb/rbPerson';
import {
  fetchAccountingSystemError,
  fetchAttachTypesError,
  fetchDetachmentReasonsError,
  fetchContactTypesError,
  fetchContactTypesSuccess,
  fetchEventTypesError,
  fetchInvalidDocumentsError,
  fetchOrganisationsError,
  fetchPatientDocumentTypesError,
  fetchPatientDocumentTypesSuccess,
  fetchPolicyKindsError,
  fetchPolicyKindsSuccess,
  fetchPolicyTypesError,
  fetchPolicyTypesSuccess,
  setRbAccountingSystem,
  setRbAttachTypes,
  setRbDetachmentReasons,
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
import RbDetachmentReasonResponse from "../../interfaces/responses/rb/rbDetachmentReason";
import RbKladrResponse from '../../interfaces/responses/rb/rbKladr';
import KladrStreet from '../../types/data/KladrStreet';
import RbPolicyTypeResponse from '../../interfaces/responses/rb/rbPolicyType';
import RbPolicyKindResponse from '../../interfaces/responses/rb/rbPolicyKind';
import RbContactTypeResponse from '../../interfaces/responses/rb/rbContactType';
import RbPatientDocumentTypeResponse from '../../interfaces/responses/rb/rbPatientDocumentType';

function* asyncFetchPersons() {
  try {
    const persons: AxiosResponse<RbPersonResponse[]> = yield call(
      RbService.fetchPersons,
    );
    if (persons.data) {
      // @ts-ignore
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
    // yield put(fetchPatientsError());
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

function* asyncFetchDetachmentReasons() {
  try {
    const detachmentReasons: AxiosResponse<RbDetachmentReasonResponse[]> = yield call(
      RbService.fetchDetachmentReasons,
    );
    if (detachmentReasons.data) {
      const formattedData = detachmentReasons.data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      yield put(setRbDetachmentReasons(formattedData));
    }
  } catch (e) {
    yield put(fetchDetachmentReasonsError());
  }
}

function* asyncFetchPolicyTypes() {
  try {
    const policyTypes: AxiosResponse<RbPolicyTypeResponse[]> = yield call(
      RbService.fetchPolicyTypes,
    );
    if (policyTypes.data) {
      const formattedData = policyTypes.data.map((item) => ({
        ...item,
      }));
      yield put(fetchPolicyTypesSuccess(formattedData));
    }
  } catch (e) {
    yield put(fetchPolicyTypesError());
  }
}

function* asyncFetchPolicyKinds() {
  try {
    const policyKinds: AxiosResponse<RbPolicyKindResponse[]> = yield call(
      RbService.fetchPolicyKind,
    );
    if (policyKinds.data) {
      const formattedData = policyKinds.data.map((item) => ({
        ...item,
      }));
      yield put(fetchPolicyKindsSuccess(formattedData));
    }
  } catch (e) {
    yield put(fetchPolicyKindsError());
  }
}

function* asyncFetchContactTypes() {
  try {
    const contactTypes: AxiosResponse<RbContactTypeResponse[]> = yield call(
      // @ts-ignore
      RbService.fetchContactType,
    );
    if (contactTypes.data) {
      const formattedData = contactTypes.data.map((item) => ({
        ...item,
      }));
      yield put(fetchContactTypesSuccess(formattedData));
    }
  } catch (e) {
    yield put(fetchContactTypesError());
  }
}

function* asyncFetchDocumentTypes() {
  try {
    const documentTypes: AxiosResponse<
      RbPatientDocumentTypeResponse[]
      // @ts-ignore
    > = yield call(RbService.fetchPatientDocumentTypes);
    if (documentTypes.data) {
      const formattedData = documentTypes.data.map((item) => ({
        ...item,
      }));
      yield put(fetchPatientDocumentTypesSuccess(formattedData));
    }
  } catch (e) {
    yield put(fetchPatientDocumentTypesError());
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
  yield takeEvery(FETCH_DETACHMENT_REASONS, asyncFetchDetachmentReasons);
  yield takeEvery(FETCH_POLICY_KINDS, asyncFetchPolicyKinds);
  yield takeEvery(FETCH_POLICY_TYPES, asyncFetchPolicyTypes);
  yield takeEvery(FETCH_CONTACT_TYPES, asyncFetchContactTypes);
  yield takeEvery(FETCH_PATIENT_DOCUMENT_TYPES, asyncFetchDocumentTypes);
}

export default function* rbSaga() {
  yield all([fork(watchAsync)]);
}
