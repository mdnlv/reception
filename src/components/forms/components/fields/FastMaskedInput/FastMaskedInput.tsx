import React from 'react';
import { FastField, FastFieldProps } from 'formik';

import {FastMaskedProps} from "./types";

import MaskedInputFastField from '../MaskedInputFastField/MaskedInputFastField';

const FastMaskedInput: React.FC<FastMaskedProps> = ({name, mask}) => {
  return (
    <FastField>
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
