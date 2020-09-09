import { AuthReducer } from './auth/reducers';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RegistrationCardReducer } from './registrationCard/reducers';
import { PatientsReducer } from './patients/reducers';
import { SearchPatientFiltersReducer } from './searchPatientFilters/reducers';
import { InfoBookReducer } from './infoBook/reducers';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { infoBookSaga } from './infoBook/sagas';
import { patientsSaga } from './patients/sagas';
import { PatientCardReducer } from './patientCard/reducers';
import { patientCardSaga } from './patientCard/sagas';

export const rootReducer = combineReducers({
  auth: AuthReducer,
  registrationCard: RegistrationCardReducer,
  patients: PatientsReducer,
  searchPatientFilters: SearchPatientFiltersReducer,
  infoBooks: InfoBookReducer,
  patientCard: PatientCardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

function* rootSaga() {
  yield all([fork(infoBookSaga), fork(patientsSaga), fork(patientCardSaga)]);
}

export default function configureStore() {
  const composeEnchancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    {},
    composeEnchancers(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
