import {initialState} from "../reducers";
import {SET_SEARCH_FILTER} from "../types";
import {setFormFilter} from "../actions";


describe('search patient filter actions', () => {
    it('should create correct action', () => {
        const payload = {
            ...initialState
        }

        const expectedAction = {
            type: SET_SEARCH_FILTER,
            payload
        }

        expect(setFormFilter(payload))
            .toEqual(expectedAction)
    })
})
