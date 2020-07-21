import {SET_CURRENT_PATIENT} from "../types";
import {setCurrentPatient} from "../actions";

describe('actions', () => {
    it('should create correct action', () => {
        const payload = {
            patientId: '1'
        }
        const expectedAction = {
            type: SET_CURRENT_PATIENT,
            payload: {...payload}
        }
        expect(setCurrentPatient(payload)).toEqual(expectedAction)
    })
})
