import { FETCH_PATIENTS, QUERY_PATIENTS } from './types';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import PatientsService from '../../services/PatientsService';
import {
  fetchPatientsError,
  setFoundPatients,
  setLoading,
  setPatients,
} from './actions';
import { AxiosResponse } from 'axios';
import PatientResponse from '../../interfaces/responses/patients/patient';
import Patient from '../../types/data/Patient';
import transformPatientResponse from '../utils/transformPatientResponse';

function* asyncGetPatients(action: FETCH_PATIENTS) {
  try {
    yield put(setLoading(true));
    const { limit, offset } = action.payload;
    const patients: AxiosResponse<PatientResponse[]> = yield call(
      PatientsService.fetchPatients,
      limit || 0,
      offset || 0,
    );
    if (patients.data) {
      const formattedData: Patient[] = patients.data.map((item) =>
        transformPatientResponse(item),
      );
      yield put(setPatients(formattedData));
    }
  } catch (e) {
    yield put(fetchPatientsError());
  } finally {
    yield put(setLoading(false));
  }
}

function* asyncQueryPatients(action: QUERY_PATIENTS) {
  try {
    yield put(setLoading(true));
    const queryFilters = action.payload;
    const foundPatients: AxiosResponse<PatientResponse[]> = yield call(
      PatientsService.queryPatients,
      queryFilters,
    );
    if (foundPatients.data) {
      const formattedData: Patient[] = foundPatients.data.map((item) =>
        transformPatientResponse(item),
      );
      yield put(setFoundPatients(formattedData));
    }
  } catch (e) {
  } finally {
  }
}

function* watchAsync() {
  yield takeEvery(FETCH_PATIENTS, asyncGetPatients);
  yield takeEvery(QUERY_PATIENTS, asyncQueryPatients);
}

export function* patientsSaga() {
  yield all([fork(watchAsync)]);
}
