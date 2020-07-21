import {initialState} from "../reducers";
import {SET_FORM_SECTION} from "../types";
import {setFormSection} from "../actions";


describe('registration actions', () => {
    it('should create correct action', () => {
        const payload = {
            ...initialState,
        }

        const expectedAction = {
            type: SET_FORM_SECTION,
            payload
        }

        expect(setFormSection(payload))
            .toEqual(expectedAction)
    })
})
