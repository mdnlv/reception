import React, { useCallback } from 'react';
import { useField } from 'formik';
import { DatePicker } from 'antd';
import moment from 'moment';
import { DatePickerProps } from 'antd/es/date-picker';

type PickerProps = DatePickerProps & {
  name: string;
};

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
      value={field.value ? moment(field.value) : undefined}
      onChange={onChangeHandler}
    />
  );
};

export default FastDatePicker;
