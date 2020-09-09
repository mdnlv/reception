import { FETCH_ID_PATIENT } from './types';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import PatientsService from '../../services/PatientsService';
import { AxiosResponse } from 'axios';
import PatientResponse from '../../interfaces/responses/patients/patient';
import {
  fetchIdPatientError,
  setPatient,
  setPatientCardLoading,
} from './actions';
import transformPatientResponse from '../utils/transformPatientResponse';

function* asyncFetchPatient(param: FETCH_ID_PATIENT) {
  try {
    yield put(setPatientCardLoading(true));
    const idPatient: AxiosResponse<PatientResponse[]> = yield call(
      PatientsService.fetchIdPatient,
      param.payload,
    );
    if (idPatient.data && idPatient.data[0]) {
      yield put(setPatient(transformPatientResponse(idPatient.data[0])));
    } else {
      yield put(fetchIdPatientError());
    }
  } catch (e) {
    fetchIdPatientError();
  } finally {
    yield put(setPatientCardLoading(false));
  }
}

function* watchAsync() {
  yield takeEvery(FETCH_ID_PATIENT, asyncFetchPatient);
}

export function* patientCardSaga() {
  yield all([fork(watchAsync)]);
}
