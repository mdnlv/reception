import React from "react";
import {mount, shallow} from "enzyme";
import PatientReceptionCard from "./PatientReceptionCard";
import moment from "moment";

describe('PatientReceptionCard', function () {

    const props = {
        isPast: true,
        date: moment(0).toDate(),
        unit: 'test',
        doctor: 'test',
        specialization: 'test',
        type: 'test'
    }

    it('shallow render', () => {
        const wrapper = shallow(<PatientReceptionCard {...props}/>)
        expect(wrapper).toMatchSnapshot()
    })

    it('render card actions', () => {
        const wrapper = shallow(<PatientReceptionCard {...props} />)
        expect(wrapper.find('.patient-reception-card__actions')).toHaveLength(1)
    })

})
