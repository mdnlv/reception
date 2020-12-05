import React, {useCallback} from 'react';
import {useField} from 'formik';
import {DatePicker} from 'antd';
import moment from 'moment';
// import DatePicker from 'react-datepicker';

import {PickerProps} from "./types";

const FastDatePicker: React.FC<PickerProps> = (props) => {
  const [field, meta, form] = useField<string>(props.name);

  const onChangeHandler = useCallback(
    (date: moment.Moment | null, dateString: string) => {
      form.setValue(dateString);
    },
    [form],
  );

  return (
    <DatePicker
      {...props}
      defaultValue={moment()}
      allowClear={false}
      value={field.value ? moment(field.value) : undefined}
      onChange={onChangeHandler}
    />
    // <DatePicker
    //   value={field.value ? moment(field.value) : undefined}
    //   // onChange={onChangeHandler}
    // />
  );
};

export default FastDatePicker;
