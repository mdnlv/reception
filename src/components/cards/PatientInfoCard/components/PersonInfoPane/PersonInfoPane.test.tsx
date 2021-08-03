import React from 'react'
import {shallow} from "enzyme"
import PersonInfoPane from "./PersonInfoPane";
import moment from "moment";

describe('PersonInfoPane', () => {
    it('render component', () => {
        const wrapper = shallow(<PersonInfoPane/>)
        expect(wrapper).toMatchSnapshot()
    })

    it('render correct props', () => {
        const patient = {
            id: '1',
            fullName: 'Test test test',
            birthDate: moment(new Date()).toDate(),
            sex: 'М',
            snils: '213-312321-312',
            cNumber: '132123123123',
            kNumber: '213e123123,',
            address: 'Санкт-Петербург,\n' +
                'Революции ш.д.18 кв.1',
            viewType: 'амбуларно'
        }
        const wrapper = shallow(<PersonInfoPane patient={patient}/>)
    })
})
