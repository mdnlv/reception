import React from 'react'
import {mount, shallow} from "enzyme"
import PersonAppointmentsPane from "./PersonAppointmentsPane";
import moment from "moment";
import PersonAppointment from "../../../../../types/data/PersonAppointment";

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('PesronAppointmentsPane', () => {

    it("render component", () => {
        const apArray: PersonAppointment[] = []
        const wrapper = shallow(<PersonAppointmentsPane appointmentsList={apArray}/>)
        expect(wrapper).toMatchSnapshot()
    })

    it("render correct list length", () => {
        const apArray: PersonAppointment[] = [{
            id: 1,
            date: moment(0).toDate(),
            type: 'Осмотр',
            specialization: '',
            unit: 'Терапевтическое',
            doctor: 'Александров Александр Александрович'
        }]
        const wrapper = mount(<PersonAppointmentsPane appointmentsList={apArray}/>)
        const emptyWrapepr = mount(<PersonAppointmentsPane appointmentsList={[] as PersonAppointment[]}/>)
        const nonWrapper = mount(<PersonAppointmentsPane/>)
        expect(wrapper.children().length).toEqual(apArray.length)
        //check empty array rendering
        expect(emptyWrapepr.children('.person-appointments-list__item').length).toEqual(0)
        //check undefined array rendering
        expect(nonWrapper.children('.person-appointments-list__item').length).toEqual(0)
    })
})
