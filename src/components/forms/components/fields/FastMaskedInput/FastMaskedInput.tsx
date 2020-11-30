import React from 'react';
import { FastField, FastFieldProps } from 'formik';

import { FastMaskedProps } from './types';

import MaskedInputFastField from '../MaskedInputFastField/MaskedInputFastField';

const FastMaskedInput: React.FC<FastMaskedProps> = (props) => {
  console.log('mask', props.mask)
  return (
    <FastField name={props.name}>
      {({ field, form }: FastFieldProps) => (
        <MaskedInputFastField
          {...props}
          value={field.value}
          name={props.name}
          onChange={form.handleChange}
        />
      )}
    </FastField>
  );
};

export default FastMaskedInput;
