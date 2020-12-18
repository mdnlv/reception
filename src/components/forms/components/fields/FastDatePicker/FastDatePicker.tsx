import React, {useCallback} from 'react';
import {useField} from 'formik';
import {DatePicker} from 'antd';
import moment from 'moment';

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
    <>
      <DatePicker
        {...props}
        allowClear
        format={"DD.MM.YYYY"}
        placeholder={"ДД.ММ.ГГГГ"}
        value={field.value ? moment(field.value, "DD.MM.YYYY") : undefined}
        onChange={onChangeHandler}
      />
    </>
  );
};

export default FastDatePicker;
