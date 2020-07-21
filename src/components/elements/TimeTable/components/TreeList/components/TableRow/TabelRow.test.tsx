import React from 'react'
import {mount, shallow} from "enzyme";
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
        const wrapper = mount(<TableRow {...tableRowProps}/>)
        expect(wrapper.find('.table-row__content').children().length).toEqual(40)
    })
})
