import {AuthReducer} from "./auth/reducers";
import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import {RegistrationCardReducer} from "./registrationCard/reducers";
import {PatientsReducer} from "./patients/reducers";


export const rootReducer = combineReducers({
    auth: AuthReducer,
    registrationCard: RegistrationCardReducer,
    patients: PatientsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer, composeWithDevTools(
    applyMiddleware()
))

