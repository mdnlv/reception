import {
    AuthActionsType,
    AuthState,
} from "./types";

export const initialState: AuthState = {
    authInfo: {
        id: '',
        fullName: ''
    }
}

export function AuthReducer(
    state = initialState,
    action: AuthActionsType
): AuthState {
    switch (action.type) {
        case "INIT_AUTH":
            console.log(state)
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
