import React from 'react';
import { FastField, FastFieldProps } from 'formik';
import InputNumberFastField from '../InputNumberFastField/InputNumberFastField';
import { InputNumberProps } from 'antd/es/input-number';

interface InputProps extends InputNumberProps {
  name: string;
}

const FastInputNumber: React.FC<InputProps> = (props) => {
  return (
    <FastField name={props.name}>
      {({ field, meta, form }: FastFieldProps) => (
        <InputNumberFastField
          {...props}
          name={props.name}
          onChange={(val) => {
            form.setFieldValue(props.name, val);
          }}
        />
      )}
    </FastField>
  );
};

export default FastInputNumber;
