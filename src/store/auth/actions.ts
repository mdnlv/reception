import {AuthState, AuthStateType, INIT_AUTH} from "./types";


export function initAuth(authInfo: AuthState): AuthStateType {
    return {
        type: INIT_AUTH,
        payload: authInfo
    }
}
