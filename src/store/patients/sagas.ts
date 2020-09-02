import {FETCH_PATIENTS, PatientsActionsType} from "./types";
import {takeEvery, fork, all, call, put} from "redux-saga/effects";
import PatientsService from "../../services/PatientsService";
import {fetchPatientsError, setPatients} from "./actions";


function * asyncGetPatients(params: PatientsActionsType) {
    try{
        const patients = yield call(PatientsService.fetchPatients, 0, 0)
        if(patients.data){
            yield put(setPatients(patients.data))
        }
    }catch (e) {
        yield put(fetchPatientsError())
    }
}


function * watchAsync() {
    yield takeEvery(FETCH_PATIENTS, asyncGetPatients)
}


export function* patientsSaga() {
    yield all([
        fork(watchAsync)
    ])
}
