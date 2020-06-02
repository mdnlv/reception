export const INIT_AUTH = 'INIT_AUTH'

export interface AuthState {
    authInfo: {
        id: string
        fullName: string
    }
}

export interface InitAuthAction{
    type: typeof INIT_AUTH
    payload: AuthState
}

export type AuthStateType = InitAuthAction
