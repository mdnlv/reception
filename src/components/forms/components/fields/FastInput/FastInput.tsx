import React from 'react';
import { FastField, FastFieldProps } from 'formik';
import TextFastField from '../TextFastField/TextFastField';
import { InputProps } from 'antd/es/input';

interface FastInputProps extends InputProps {
  name: string;
}

const FastInput: React.FC<FastInputProps> = (props) => {
  return (
    <FastField name={props.name}>
      {({ field, meta, form }: FastFieldProps) => (
        <TextFastField
          {...props}
          name={field.name}
          value={field.value}
          onChange={form.handleChange}
        />
      )}
    </FastField>
  );
};

export default FastInput;
