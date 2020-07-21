import React from "react";
import {mount, render, shallow} from "enzyme";
import PatientReceptions from "./PatientReceptions";
import moment from "moment";
import PatientReceptionCard from "../../cards/PatientReceptionCard/PatientReceptionCard";


describe('PatientReception', () => {

    const props = {
        isVisible: true,
        title: 'test',
        receptions: [
            {
                id: '1',
                date: moment(0).toDate(),
                type: 'test',
                specialization: 'test',
                doctor: 'test',
                unit: 'test'
            }
        ]
    }

    it('shallow render', () => {
        const wrapper = shallow(<PatientReceptions {...props}/>)
        expect(wrapper).toMatchSnapshot()
    })

    it('check props', () => {
        const wrapper = mount(<PatientReceptions {...props} />)
        expect(wrapper.find('.patient-reception-card')).toHaveLength(2)
    })

})
