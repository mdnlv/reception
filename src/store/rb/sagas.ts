import { FETCH_EVENT_TYPES, FETCH_PERSONS } from './types';
import { takeEvery, all, fork, call, put } from 'redux-saga/effects';
import RbService from '../../services/RbService';
import { fetchPatientsError } from '../patients/actions';
import { AxiosResponse } from 'axios';
import RbPersonResponse from '../../interfaces/responses/rb/rbPerson';
import { setRbEventTypes, setRbPersons } from './actions';
import RbEventTypeResponse from '../../interfaces/responses/rb/rbEventType';

function* asyncFetchPersons() {
  try {
    const persons: AxiosResponse<RbPersonResponse[]> = yield call(
      RbService.fetchPersons,
    );
    if (persons.data) {
      const formattedData = persons.data.map((item) => ({
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
      const formattedData = persons.data.map((item) => ({
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
    yield put(fetchPatientsError());
  } finally {
  }
}

function* watchAsync() {
  yield takeEvery(FETCH_PERSONS, asyncFetchPersons);
  yield takeEvery(FETCH_EVENT_TYPES, asyncFetchEventTypes);
}

export default function* rbSaga() {
  yield all([fork(watchAsync)]);
}
