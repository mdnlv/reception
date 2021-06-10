import React from 'react';
import { useField } from 'formik';
import { Select } from 'antd';

import { SearchSelectProps } from './types';

const FastSearchSelect: React.FC<SearchSelectProps> = (props) => {
 
  const [field, meta, form] = useField(props.name);

    const value = field.value ? field.value:undefined ;
        
  return (
    <Select
      {...props}
      value={value}
      disabled={props.isDisabled}
      onSearch={(val) => {
      props.onSearch && props?.onSearch(val)
      }}
      onChange={(val) => {
        form.setValue(val);
      }}
    >
      {props.children}
    </Select>
  );
};

export default FastSearchSelect;
