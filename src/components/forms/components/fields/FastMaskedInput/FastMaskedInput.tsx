import React from 'react';
import { FastField, FastFieldProps } from 'formik';
import MaskedInputFastField from '../MaskedInputFastField/MaskedInputFastField';
import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';

interface FastMaskedProps extends MaskedInputProps {}

const FastMaskedInput: React.FC<FastMaskedProps> = (props) => {
  return (
    <FastField>
      {({ field, meta, form }: FastFieldProps) => (
        <MaskedInputFastField
          {...props}
          value={field.value}
          name={props.name || ''}
          onChange={form.handleChange}
        />
      )}
    </FastField>
  );
};

export default FastMaskedInput;
