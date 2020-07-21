import {initialState, SearchPatientFiltersReducer} from "../reducers";
import {setFormFilter} from "../actions";


describe('search patient filters reducer', () => {
    it('correct set form filter', () => {
        const payload = {
            ...initialState,
            disabilities: {
                docType: 'passport',
                startDate: new Date(),
                endDate: new Date(),
                serial: 'asdasd',
                number: 'asdasd',
                disabilityReason: 'rwsar'
            }
        }

        expect(SearchPatientFiltersReducer(initialState, setFormFilter(payload)))
            .toEqual(payload)
    })
})
