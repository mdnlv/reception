import React from 'react'
import {shallow} from "enzyme";

import PatientHappeningsList from "./PatientHappeningsList";

const listData = [
    {
        id: '1',
        type: 'Осмотр',
        assignDoc: 'Болотов В.К.',
        executedDoc: 'Болотов В.Д',
        state: 'Закончено',
        startDate: new Date()
    },
    {
        id: '2',
        type: 'Осмотр',
        assignDoc: 'Болотов В.К.',
        executedDoc: 'Болотов В.Д',
        state: 'Закончено',
        startDate: new Date()
    }
]

describe('PatientHappeningsList', () => {
    it('shallow render', () => {
        const wrapper = shallow(<PatientHappeningsList data={[]}/>)
        expect(wrapper).toMatchSnapshot()
    })

    it('correct renders list', () => {
        const wrapper = shallow(<PatientHappeningsList data={listData}/>)

        expect(wrapper.find('.happenings-list').children()).toHaveLength(2)
        //empty render
        const emptyWrapper = shallow(<PatientHappeningsList data={[]}/>)
        expect(emptyWrapper.find('.happenings-list').children()).toHaveLength(0)
    })
})
