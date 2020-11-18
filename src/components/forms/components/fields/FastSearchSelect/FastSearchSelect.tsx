import React from 'react';
import { useField } from 'formik';
import { Select } from 'antd';

import {SearchSelectProps} from "./types";

const FastSearchSelect: React.FC<SearchSelectProps> = ({
  name,
  children,
  isDisabled,
  valueSet,
  onFocus
}) => {
  const [field, meta, form] = useField(name);

  return (
    <Select
      {...{name, children, onFocus}}
      value={valueSet ? valueSet : field.value}
      disabled={isDisabled}
      onChange={(val) => {
        form.setValue(val);
      }}
      // onFocus={onFocus}
    >
      {children}
    </Select>
  );
};

export default FastSearchSelect;
