import React from 'react';
import { useField } from 'formik';
import { AutoComplete } from 'antd';


const AutoCompleteInput: React.FC<any> = (props) => {
  const [field, meta, form] = useField(props.name);

    
    const value = props.loading? '':field.value;
        
  return (
    <AutoComplete
      {...props}
      options={props.options}
      disabled={props.isDisabled}
      onChange={(val) => {
        form.setValue(val);
      }}
    />
  );
};

export default AutoCompleteInput;
