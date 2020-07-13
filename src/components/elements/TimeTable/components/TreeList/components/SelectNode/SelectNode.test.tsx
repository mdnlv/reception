import React from 'react'
import {mount, render, shallow} from "enzyme";
import SelectNode from "./SelectNode";

describe('SelectNode', () => {
    const selectNodeProps = {
        title: 'test',
        id: 'test',
        selected: false,
        doc: 'test',
        unit: 'test',
        docSpecialization: 'test',
        type: 'day' as 'day'
    }
    it('shallow render', () => {
        const wrapper = shallow(<SelectNode  {...selectNodeProps}/>)

        expect(wrapper).toMatchSnapshot(wrapper)
    })

    it('check selected prop', () => {
        const wrapper = mount(<SelectNode {...selectNodeProps} />)
        expect(wrapper.find('.list-node__content')).toHaveLength(0)

        //check true selected
        const trueWrapper = mount(<SelectNode {...{...selectNodeProps, selected: true}} />)
        expect(trueWrapper.find('.list-node__content')).toHaveLength(1)
    })

})
