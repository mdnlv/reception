import React from 'react';
import { useField } from 'formik';

import { FastInputProps } from './types';

import TextFastField from '../TextFastField/TextFastField';

const FastInput: React.FC<FastInputProps> = ({ name, disabled }) => {
  const [field, , form] = useField<string>(name);

  return (
    <TextFastField
      {...{ name, disabled }}
      disabled={disabled}
      name={field.name}
      value={field.value}
      onChange={(event) => {
        form.setValue(event.target.value);
      }}
    />
  );
};

export default FastInput;
