import React from 'react'
import {shallow} from "enzyme";
import PatientHappeningsHeader from "./PatientHappeningsHeader";


describe('PatientHappeningsHeader', () =>{
    it('shallow render', () => {
        const listProps = {
            uploadDoc: jest.fn()
        }
        const wrapper = shallow(<PatientHappeningsHeader {...listProps} />)
        expect(wrapper).toMatchSnapshot()
    })
})
