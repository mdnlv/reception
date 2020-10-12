import React from 'react';
import { shallow } from 'enzyme';
import PatientHappenings from './PatientHappenings';

describe('PatientHappenings', () => {
  it('shallow render', () => {
    const wrapper = shallow(<PatientHappenings events={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
