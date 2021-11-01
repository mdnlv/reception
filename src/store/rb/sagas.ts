import {
  FETCH_ATTACH_TYPES,
  FETCH_DETACHMENT_REASONS,
  FETCH_CONTACT_TYPES,
  FETCH_ORGANISATIONS,
  FETCH_PATIENT_DOCUMENT_TYPES,
  FETCH_PERSONS,
  FETCH_POLICY_KINDS,
  FETCH_POLICY_TYPES, FETCH_SNILS_MISSING_REASONS,
  FETCH_POLICY_DISCHARGE_REASONS,
} from './types';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import RbService from '../../services/RbService';
import { AxiosResponse } from 'axios';
import RbPersonResponse from '../../interfaces/responses/rb/rbPerson';
import {
  fetchDetachmentReasonsError,
  fetchContactTypesError,
  fetchContactTypesSuccess,
  fetchOrganisationsError,
  fetchPatientDocumentTypesError,
  fetchPatientDocumentTypesSuccess,
  fetchPolicyKindsError,
  fetchPolicyKindsSuccess,
  fetchPolicyTypesError,
  fetchPolicyTypesSuccess,
  setRbDetachmentReasons,
  setSNILSMissingReasons,
  setPolicyDischargeReasons,
  setRbOrganisations,
  setRbPersons,
  fetchSNILSMissingReasonsError,
  fetchPolicyDischargeReasonsError
} from './actions';
import Person from '../../types/data/Person';
import RbOrganisationResponse from '../../interfaces/responses/rb/rbOrganisation';
import RbDetachmentReasonResponse from "../../interfaces/responses/rb/rbDetachmentReason";
import RbPolicyTypeResponse from '../../interfaces/responses/rb/rbPolicyType';
import RbPolicyKindResponse from '../../interfaces/responses/rb/rbPolicyKind';
import RbContactTypeResponse from '../../interfaces/responses/rb/rbContactType';
import RbPatientDocumentTypeResponse from '../../interfaces/responses/rb/rbPatientDocumentType';
import RbPolicyDischargeReason from "../../interfaces/responses/rb/rbPolicyDischargeReason";

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

function* asyncFetchOrganisations(action: FETCH_ORGANISATIONS) {
  try {
    const organisations: AxiosResponse<RbOrganisationResponse[]> = yield call(
      RbService.fetchOrganisation,
    );
    if (organisations.data) {
      const formattedData = organisations.data.map((item) => ({
        ...item,
      }));
      // @ts-ignore
      yield put(setRbOrganisations(formattedData));
    }
  } catch (e) {
    console.log(e);
    yield put(fetchOrganisationsError());
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

function* asyncFetchSNILSMissingReasons() {
  try {
    const SNILSMissingReasons: AxiosResponse<RbDetachmentReasonResponse[]> = yield call(
      RbService.fetchSNILSMissingReasons,
    );
    if (SNILSMissingReasons.data) {
      const formattedData = SNILSMissingReasons.data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      yield put(setSNILSMissingReasons(formattedData));
    }
  } catch (e) {
    yield put(fetchSNILSMissingReasonsError());
  }
}

function* asyncFetchPolicyDischargeReason() {
  try {
    const PolicyDischargeReasons: AxiosResponse<RbPolicyDischargeReason[]> = yield call(
      RbService.fetchPolicyDischargeReason,
    );
    if (PolicyDischargeReasons.data) {
      const formattedData = PolicyDischargeReasons.data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      yield put(setPolicyDischargeReasons(formattedData));
    }
  } catch (e) {
    yield put(fetchPolicyDischargeReasonsError());
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
  yield takeEvery(FETCH_ORGANISATIONS, asyncFetchOrganisations);
  yield takeEvery(FETCH_DETACHMENT_REASONS, asyncFetchDetachmentReasons);
  yield takeEvery(FETCH_SNILS_MISSING_REASONS, asyncFetchSNILSMissingReasons);
  yield takeEvery(FETCH_POLICY_DISCHARGE_REASONS, asyncFetchPolicyDischargeReason);
  yield takeEvery(FETCH_POLICY_KINDS, asyncFetchPolicyKinds);
  yield takeEvery(FETCH_POLICY_TYPES, asyncFetchPolicyTypes);
  yield takeEvery(FETCH_CONTACT_TYPES, asyncFetchContactTypes);
  yield takeEvery(FETCH_PATIENT_DOCUMENT_TYPES, asyncFetchDocumentTypes);
}

export default function* rbSaga() {
  yield all([fork(watchAsync)]);
}
