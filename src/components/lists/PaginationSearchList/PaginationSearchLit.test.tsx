import React from 'react'
import {shallow} from "enzyme";
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

        const wrapper = shallow(<PaginationSearchList<testDataType> data={data} />).dive()
        expect(wrapper.find('.list-content').children()).toHaveLength(2)
        //empty data
        const emptyWrapper = shallow(<PaginationSearchList/>).dive()
        expect(emptyWrapper.find('.list-content').children()).toHaveLength(0)
    })

})
