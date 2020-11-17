import React, {useCallback} from 'react';
import {useField} from 'formik';
import {DatePicker} from 'antd';
import moment from 'moment';

import {PickerProps} from "./types";

const FastDatePicker: React.FC<PickerProps> = ({name}) => {
  const [field, meta, form] = useField<string>(name);

  const onChangeHandler = useCallback(
    (date: moment.Moment | null, dateString: string) => {
      form.setValue(dateString);
    },
    [form],
  );

  return (
    <DatePicker
      {...{name}}
      value={field.value ? moment(field.value) : undefined}
      onChange={onChangeHandler}
    />
  );
};

export default FastDatePicker;
