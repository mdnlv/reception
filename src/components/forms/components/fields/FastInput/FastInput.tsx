import React from 'react';
import { FastField, FastFieldProps } from 'formik';
import TextFastField from '../TextFastField/TextFastField';

interface InputProps {
  name: string;
}

const FastInput: React.FC<InputProps> = (props) => {
  return (
    <FastField name={props.name}>
      {({ field, meta, form }: FastFieldProps) => (
        <TextFastField
          name={field.name}
          value={field.value}
          onChange={form.handleChange}
        />
      )}
    </FastField>
  );
};

export default FastInput;
