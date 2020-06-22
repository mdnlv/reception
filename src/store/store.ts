import {AuthReducer} from "./auth/reducers";
import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import {RegistrationCardReducer} from "./registrationCard/reducers";
import {PatientsReducer} from "./patients/reducers";
import {SearchPatientFiltersReducer} from "./searchPatientFilters/reducers";


export const rootReducer = combineReducers({
    auth: AuthReducer,
    registrationCard: RegistrationCardReducer,
    patients: PatientsReducer,
    searchPatientFilters: SearchPatientFiltersReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer, composeWithDevTools(
    applyMiddleware()
))

