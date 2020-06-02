import {
    AuthState,
    AuthStateType,
    INIT_AUTH
} from "./types";

export const initialState: AuthState = {
    authInfo: {
        id: '',
        fullName: ''
    }
}

export function AuthReducer(
    state = initialState,
    action: AuthStateType
): AuthState {
    switch (action.type) {
        case "INIT_AUTH":
            return {
                ...action.payload
            }
        default:
            return initialState
    }
}
