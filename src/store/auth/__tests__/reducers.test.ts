import {INIT_AUTH} from "../types";
import {AuthReducer} from "../reducers";

describe('auth reducer', () => {
    it('get init auth state', () => {

        const payload = {
            authInfo: {
                id: "test",
                fullName: "test"
            }
        }

        expect(AuthReducer(undefined, {
            type: INIT_AUTH,
            payload: {...payload}
        }))
            .toEqual({...payload})
    })
})
