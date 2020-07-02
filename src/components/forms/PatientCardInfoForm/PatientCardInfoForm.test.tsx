import React from "react";
import {mount, render, shallow} from "enzyme";
import PatientCardInfoForm from "./PatientCardInfoForm";
import moment from "moment";
import FormState from "./types";

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('PatientCardInfoForm', () => {
    const initialValues: {patient: FormState} = {
        patient: {
            code: 'test',
            fullName: 'test',
            birthDate: moment(0).toDate(),
            gender: 'М',
            passport: 'test',
            features: '',
            registration: 'test',
            livingAddress: 'test',
            birthPlace: 'test',
            snils: 'test',
            oms: 'test',
            attachment: 'test',
            doc: 'test',
            phone: '79531122333',
            workPlace: 'test',
            workSpecialization: 'test'
        }
    }
    it('shallow rendering', () => {
        const wrapper = shallow(<PatientCardInfoForm patient={initialValues.patient} />)
        expect(wrapper).toMatchSnapshot()
    })


    it('renders correct items of form', () => {
        const wrapper = shallow(<PatientCardInfoForm patient={initialValues.patient}/>).dive()
        expect(wrapper.find('.form-section__item')).toHaveLength(16)
    })
})
