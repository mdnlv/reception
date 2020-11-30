import React from 'react';
import { useField } from 'formik';

import { FastInputProps } from './types';

import TextFastField from '../TextFastField/TextFastField';

const FastInput: React.FC<FastInputProps> = (props) => {
  const [field, , form] = useField<string>(props.name);

  return (
    <TextFastField
      {...props}
      disabled={props.disabled}
      name={field.name}
      value={field.value}
      onChange={(event) => {
        form.setValue(event.target.value);
      }}
    />
  );
};

export default FastInput;
