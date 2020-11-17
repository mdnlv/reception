import React from 'react';
import { FastField, FastFieldProps } from 'formik';
import MaskedInputFastField from '../MaskedInputFastField/MaskedInputFastField';
import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';

interface FastMaskedProps extends MaskedInputProps {
  name: string;
}

const FastMaskedInput: React.FC<FastMaskedProps> = (props) => {
  return (
    <FastField name={props.name}>
      {({ field, meta, form }: FastFieldProps) => (
        <MaskedInputFastField
          {...props}
          value={field.value.toString()}
          name={props.name}
          onChange={form.handleChange}
        />
      )}
    </FastField>
  );
};

export default FastMaskedInput;
