export const INIT_AUTH = 'INIT_AUTH'

export interface AuthState {
    authInfo: {
        id: string
        fullName: string
    }
}

export interface INIT_AUTH_ACTION{
    type: typeof INIT_AUTH
    payload: AuthState
}

export type AuthActionsType = INIT_AUTH_ACTION
