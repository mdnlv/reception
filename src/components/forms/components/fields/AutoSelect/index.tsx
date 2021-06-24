import React from 'react';
import { useField } from 'formik';
import { AutoComplete } from 'antd';
import { useDebouncedCallback } from 'use-debounce';


const AutoCompleteInput: React.FC<any> = (props) => {
  const [field, meta, form] = useField(props.name);

  const debounced = useDebouncedCallback((value) => {
    form.setValue(value);
    props.onSearch(value)
  },500);


  return (
    <AutoComplete
      defaultValue={props.defaultValue}
      options={props.options}
      disabled={props.isDisabled}
      onChange={(val) => {
        debounced.callback(val)
        props.onChangeValue(val)
      }}
    />
  );
};


export default AutoCompleteInput
