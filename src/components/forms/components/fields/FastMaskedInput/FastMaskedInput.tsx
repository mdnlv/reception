import React from 'react';
import { FastField, FastFieldProps } from 'formik';

import MaskedInputFastField from '../MaskedInputFastField/MaskedInputFastField';

import {FastMaskedProps} from "./types";

const FastMaskedInput: React.FC<FastMaskedProps> = ({name, mask}) => {
  return (
    <FastField name={name}>
      {({ field, meta, form }: FastFieldProps) => (
        <MaskedInputFastField
          {...{name, mask}}
          value={field.value}
          name={name || ''}
          onChange={form.handleChange}
        />
      )}
    </FastField>
  );
};

export default FastMaskedInput;
