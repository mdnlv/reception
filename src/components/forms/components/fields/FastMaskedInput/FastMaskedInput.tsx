import React from 'react';
import { FastField, FastFieldProps } from 'formik';

import { FastMaskedProps } from './types';

import MaskedInputFastField from '../MaskedInputFastField/MaskedInputFastField';

const FastMaskedInput: React.FC<FastMaskedProps> = (props) => {
  return (
    <FastField name={props.name}>
      {({ field, form, meta }: FastFieldProps) => (
        <MaskedInputFastField
          {...props}
          value={field.value}
          name={props.name}
          onChange={form.handleChange}
          error={meta.error && meta.touched || undefined}
        />
      )}
    </FastField>
  );
};

export default FastMaskedInput;
