import {initialPatientsState, PatientsReducer} from "./reducers";
import {setCurrentPatient} from "./actions";


describe('patients reducer', () => {
    it('correct set patient id', () => {

        const payload = {
            patientId: '1'
        }

        const expectedState = {
            ...initialPatientsState,
            currentPatient: payload.patientId.toString()
        }

        expect(
            PatientsReducer(initialPatientsState, setCurrentPatient(payload))
        )
            .toEqual(expectedState)
    })
})
