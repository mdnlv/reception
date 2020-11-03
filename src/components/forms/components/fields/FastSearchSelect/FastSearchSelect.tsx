import React from 'react';
import { FastField, FastFieldProps, useField } from 'formik';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/es/select';

interface SearchSelectProps extends SelectProps<SelectValue> {
  name: string;
}

const FastSearchSelect: React.FC<SearchSelectProps> = (props) => {
  const [field, meta, form] = useField(props.name);

  return (
    <Select
      {...props}
      value={field.value}
      onChange={(val) => {
        form.setValue(val);
      }}>
      {props.children}
    </Select>
  );
};

export default FastSearchSelect;
