import {initialState, RegistrationCardReducer} from "../reducers";
import {setFormSection} from "../actions";


describe('registration card reducer', () => {
    it('correct set form section', () => {

        const payload = {
            ...initialState,
            features: {
                allergy: [
                    {
                        name: 'test',
                        degree: 'test',
                        fromDate: new Date(),
                        note: 'test'
                    }
                ],
                ...initialState.features
            }
        }

        expect(
            RegistrationCardReducer(initialState, setFormSection(payload))
        )
            .toEqual(payload)
    })
})
