import React from 'react';
import { FastField, FastFieldProps } from 'formik';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/es/select';

interface SearchSelectProps extends SelectProps<SelectValue> {
  name: string;
}

const FastSearchSelect: React.FC<SearchSelectProps> = (props) => {
  return (
    <FastField name={props.name}>
      {({ field, meta, form }: FastFieldProps) => (
        <Select
          {...props}
          value={field.value}
          onChange={(val) => {
            form.setFieldValue(props.name, val);
          }}>
          {props.children}
        </Select>
      )}
    </FastField>
  );
};

export default FastSearchSelect;
