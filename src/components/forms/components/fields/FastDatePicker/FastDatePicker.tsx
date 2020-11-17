import React, { useCallback, useEffect } from 'react';
import { useField } from 'formik';
import { DatePicker } from 'antd';
import moment from 'moment';

import {PickerProps} from "./types";

const FastDatePicker: React.FC<PickerProps> = ({name, valueSet}) => {
  const [field, meta, form] = useField<string>(name);

  // useEffect(() => {
  //   console.log(`valueSet: ${valueSet}`)
  // }, [])

  const onChangeHandler = useCallback(
    (date: moment.Moment | null, dateString: string) => {
      form.setValue(dateString);
    },
    [form],
  );

  return (
    <DatePicker
      {...{name}}
      value={valueSet ? moment(valueSet) : field.value ? moment(field.value) : undefined}
      onChange={onChangeHandler}
    />
  );
};

export default FastDatePicker;
