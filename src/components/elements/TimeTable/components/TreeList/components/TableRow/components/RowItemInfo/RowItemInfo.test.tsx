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

    it('renders correct props', () => {
        const wrapper = shallow(<RowItemInfo
            patient={itemProps.patient}
            service={itemProps.service}
            addInfo={itemProps.addInfo}/>)

        expect(wrapper.find('row-item-card__patient')).toEqual(itemProps.patient)
        expect(wrapper.find('row-item-card__service')).toEqual(itemProps.service)
        expect(wrapper.find('row-item-card__addInfo')).toEqual(itemProps.addInfo)

    })
})
