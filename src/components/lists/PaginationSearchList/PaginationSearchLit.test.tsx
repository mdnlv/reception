import React from 'react'
import {mount, shallow} from "enzyme";
import PaginationSearchList from "./PaginationSearchList";

type testDataType = {
    title: string
}

const data = [
    {
        title: 'title 1',
    },
    {
        title: 'title 2',
    },
    {
        title: 'title 3',
    }
]

describe('PaginationSearchList', () => {
    it('shallow render', () => {
        const wrapper = shallow(<PaginationSearchList/>)
        expect(wrapper).toMatchSnapshot()
    })

    it('renders correct list', () => {

        const wrapper = mount(<PaginationSearchList<testDataType> data={data} />)
        expect(wrapper.find('.list-content').children()).toHaveLength(2)
        //empty data
        const emptyWrapper = mount(<PaginationSearchList/>)
        expect(emptyWrapper.find('.list-content').children()).toHaveLength(1)
    })

})
