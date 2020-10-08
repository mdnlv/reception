import React from 'react';
import { mount, render, shallow } from 'enzyme';
import PatientCardInfoForm from './PatientCardInfoForm';
import moment from 'moment';
import FormState from './types';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('PatientCardInfoForm', () => {});
