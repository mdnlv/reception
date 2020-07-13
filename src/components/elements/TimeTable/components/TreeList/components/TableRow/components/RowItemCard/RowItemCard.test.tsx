import React from "react";
import {shallow} from "enzyme";
import RowItemCard from "./RowItemCard";
import {Popover} from "antd";


describe('RowItemCard', () => {
    const props = {
        type: 'closed' as 'closed',
        showType: 'day' as 'day',
        isPopover: true,
        popoverContent: <div>test</div>
    }
    it('shallow render', () => {
        const wrapper = shallow(<RowItemCard {...props}/>)
        expect(wrapper).toMatchSnapshot()
    })

    it('renders correct type', () => {
        const wrapper = shallow(<RowItemCard {...props}/>)
        expect(wrapper.find('.row-item-card').hasClass(`row-item-card--${props.type}`))
            .toEqual(true)
        expect(wrapper.find(Popover)).toHaveLength(1)
        //non-popover check
        const emptyWrapper = shallow(<RowItemCard {...{...props, isPopover: false}} />)
        expect(emptyWrapper.find(Popover)).toHaveLength(0)
    })
})
