import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import RbKladrResponse from '../../interfaces/responses/rb/rbKladr';
import RbService from '../../services/RbService';
import KladrStreet from '../../types/data/KladrStreet';
import {
  fetchKladrError,
  fetchKladrNestedError,
  fetchKladrNestedSuccess,
  fetchKladrStreetsError,
  fetchKladrStreetsSuccess,
  fetchKladrSuccess,
  toggleLoadingKladr,
  toggleLoadingKladrNested,
  toggleLoadingKladrStreets,
} from './actions';
import { FETCH_KLADR, FETCH_KLADR_NESTED, FETCH_KLADR_STREETS } from './types';

function* asyncFetchKladrNested(action: FETCH_KLADR_NESTED) {
  try {
    yield put(toggleLoadingKladrNested(true));
    let nestedKladr: AxiosResponse<RbKladrResponse[]> = yield call(
      RbService.getRegionList,
      action.payload.id,
    );
    if (nestedKladr.data) {
      const formattedData = nestedKladr.data.map((item) => ({
        id: item.CODE,
        name: item.NAME,
        prefix: item.prefix,
        socr: item.SOCR,
        infis: item.infis,
      }));
      yield put(
        fetchKladrNestedSuccess({
          items: formattedData,
          type: action.payload.type,
        }),
      );
    }
  } catch (e) {
    yield put(fetchKladrNestedError());
  } finally {
    yield put(toggleLoadingKladrNested(false));
  }
}

function* asyncFetchKladr(action: FETCH_KLADR) {
  try {
    yield put(toggleLoadingKladr(true));
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
      yield put(
        fetchKladrSuccess({
          items: formattedData,
          type: action.payload && action.payload.type,
        }),
      );
    }
  } catch (e) {
    console.log(e);
    yield put(fetchKladrError());
  } finally {
    yield put(toggleLoadingKladr(false));
  }
}

function* asyncFetchKladrStreets(action: FETCH_KLADR_STREETS) {
  try {
    yield put(toggleLoadingKladrStreets(true));
    let streets: AxiosResponse<RbKladrResponse[]> = yield call(
      RbService.getRegionStreets,
      action.payload.id,
    );
    if (streets.status === 200 || streets.status === 204) {
      let formattedData: KladrStreet[] = [];
      if (Array.isArray(streets.data)) {
        formattedData = streets.data.map((item) => ({
          id: item.CODE,
          name: item.NAME,
          socr: item.SOCR,
          infis: item.infis,
        }));
      }
      yield put(
        fetchKladrStreetsSuccess({
          items: formattedData,
          type: action.payload.type,
        }),
      );
    }
  } catch (e) {
    console.log(e);
    yield put(fetchKladrStreetsError());
  } finally {
    yield put(toggleLoadingKladrStreets(false));
  }
}

function* watchAsync() {
  yield takeEvery(FETCH_KLADR, asyncFetchKladr);
  yield takeEvery(FETCH_KLADR_NESTED, asyncFetchKladrNested);
  yield takeEvery(FETCH_KLADR_STREETS, asyncFetchKladrStreets);
}

export default function* registrationCardSaga() {
  yield all([fork(watchAsync)]);
}
