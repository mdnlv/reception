import {AuthState, AuthActionsType, INIT_AUTH} from "./types";


export function initAuth(authInfo: AuthState): AuthActionsType {
    return {
        type: INIT_AUTH,
        payload: authInfo
    }
}
