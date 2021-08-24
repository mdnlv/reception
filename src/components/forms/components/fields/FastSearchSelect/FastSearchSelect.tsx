import React from 'react';
import { useField } from 'formik';
import { Select } from 'antd';

import { SearchSelectProps } from './types';
import './styles.css';

const FastSearchSelect: React.FC<SearchSelectProps> = (props) => {
  const [field, meta, form] = useField(props.name);
  const value = props.loading ? '' : field.value;

  return (
    <Select
      {...props}
      value={value}
      disabled={props.isDisabled? props.isDisabled: false}
      onSearch={(val) => {
        props.onSearch && props?.onSearch(val)
      }}
      onChange={(val) => {
        form.setValue(val);
        if(!val){
          props.onClear &&  props.onClear()
        }
      }}
      className={Boolean(meta.error && meta.touched) ? 'customSelect' : undefined}
    >
      {props.children}
    </Select>
  );
};

export default FastSearchSelect;
