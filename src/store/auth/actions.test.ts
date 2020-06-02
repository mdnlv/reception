import {INIT_AUTH} from "./types";
import {initAuth} from "./actions";

describe('actions', () => {
    it('should create correct action', () => {
        const payload = {
            authInfo: {
                id: 'exampleId',
                fullName: 'exampleName'
            }
        }
        const expectedAction = {
            type: INIT_AUTH,
            payload: {...payload}
        }
        expect(initAuth(payload)).toEqual(expectedAction)
    })
})
