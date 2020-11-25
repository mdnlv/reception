import React from 'react';
import { useField } from 'formik';
import { Select } from 'antd';

import { SearchSelectProps } from './types';

const FastSearchSelect: React.FC<SearchSelectProps> = (props) => {
  const [field, meta, form] = useField(props.name);

  return (
    <Select
      {...props}
      value={field.value}
      disabled={props.isDisabled}
      onChange={(val) => {
        form.setValue(val);
      }}
    >
      {props.children}
    </Select>
  );
};

export default FastSearchSelect;
