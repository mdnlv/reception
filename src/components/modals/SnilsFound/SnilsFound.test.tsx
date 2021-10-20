import React from 'react';
import {shallow} from "enzyme";

import SnilsFound from "./SnilsFound";

it('renders with Modal', () => {
  const wrapper = shallow(<SnilsFound data={[{key: 0, lastName: '', firstName: '', patrName: '', snils: ''}]}/>);
  expect(wrapper.find('Modal').length).toBe(1);
});
