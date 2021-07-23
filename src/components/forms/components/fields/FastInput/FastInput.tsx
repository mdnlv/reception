import React, {useEffect} from 'react';
import { useField } from 'formik';

import { FastInputProps } from './types';

import TextFastField from '../TextFastField/TextFastField';

const FastInput: React.FC<FastInputProps> = (props) => {
  const [field, meta, form] = useField<string>(props.name);

  return (
    <TextFastField
      {...props}
      disabled={props.disabled}
      name={field.name}
      value={field.value}
      onChange={(event) => {
        form.setValue(event.target.value);
      }}
      error={Boolean(meta.error)}
    />
  );
};

export default FastInput;
