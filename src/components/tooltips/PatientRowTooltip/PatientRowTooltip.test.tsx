import React from 'react'
import {mount, shallow} from "enzyme"
import PatientRowTooltip from "./PatientRowTooltip"
import moment from "moment";

describe('PatientRowTooltip', () => {
    it("shallow render component", () => {
        const componentProps = {
            fullName: 'test test',
            lastChange: moment(0).toDate()
        }
        const wrapper = mount(<PatientRowTooltip {...componentProps}/>)
        expect(wrapper.getElements()).toMatchSnapshot()
    })

    it("render correct date", () => {
        const componentProps = {
            fullName: 'test test',
            lastChange: moment(0).toDate()
        }
        const wrapper = mount(<PatientRowTooltip {...componentProps}/>)
        expect(wrapper.find('.date-item .tooltip-value').text()).toEqual('1970-01-01')
    })

    it("render correct person name", () => {
        const componentProps = {
            fullName: 'test test',
            lastChange: moment(0).toDate()
        }
        const wrapper = mount(<PatientRowTooltip {...componentProps}/>)
        expect(wrapper.find('.person-name-item .tooltip-value').text()).toEqual(componentProps.fullName)
    })
})
