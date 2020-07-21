import React from "react";
import {shallow} from "enzyme";
import RowItemInfo from "./RowItemInfo";


describe('RowItemInfo', () => {
    const itemProps = {
        patient: 'test',
        service: 'test',
        addInfo: 'test'
    }
    it('shallow rendering', () => {
        const wrapper = shallow(<RowItemInfo
            patient={itemProps.patient}
            service={itemProps.service}
            addInfo={itemProps.addInfo}/>)
        expect(wrapper).toMatchSnapshot()
    })
})
