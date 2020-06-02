import {AuthReducer} from "./auth/reducers";
import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import {RegistrationCardReducer} from "./registrationCard/reducers";


export const rootReducer = combineReducers({
    auth: AuthReducer,
    registrationCard: RegistrationCardReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer, composeWithDevTools(
    applyMiddleware()
))

