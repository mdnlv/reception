import React from 'react';
import { FastField, FastFieldProps } from 'formik';

import {InputProps} from "./types";

import InputNumberFastField from '../InputNumberFastField/InputNumberFastField';

const FastInputNumber: React.FC<InputProps> = ({name}) => {
  return (
    <FastField name={name}>
      {({ field, meta, form }: FastFieldProps) => (
        <InputNumberFastField
          {...{name}}
          name={name}
          value={field.value}
          onChange={(val) => {
            form.setFieldValue(name, val);
          }}
        />
      )}
    </FastField>
  );
};

export default FastInputNumber;
