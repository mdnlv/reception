import React from 'react'
import {shallow} from "enzyme";
import TableRow from "./TableRow";


describe('TableRow', () => {
    const tableRowProps = {
        type: 'day' as 'day',
    }
    it('shallow render', () => {
        const wrapper = shallow(<TableRow {...tableRowProps}/>)
        expect(wrapper).toMatchSnapshot()
    })

    it('correct num of table row items', () => {
        const wrapper = shallow(<TableRow {...tableRowProps}/>)
        expect(wrapper.children().length).toEqual(40)
    })
})
