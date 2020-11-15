import React from 'react';
import { useField } from 'formik';
import { Select } from 'antd';

import {SearchSelectProps} from "./types";

const FastSearchSelect: React.FC<SearchSelectProps> = ({name, children}) => {
  const [field, meta, form] = useField(name);

  return (
    <Select
      {...{name, children}}
      value={field.value}
      onChange={(val) => {
        form.setValue(val);
      }}>
      {children}
    </Select>
  );
};

export default FastSearchSelect;
