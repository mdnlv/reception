import React, {useCallback, useEffect, useState} from 'react';
import {useField} from 'formik';
import {DatePicker} from 'antd';
import moment from 'moment';

import {PickerProps} from "./types";

const FastDatePicker: React.FC<PickerProps> = (props) => {
  const [field, meta, form] = useField<string>(props.name);
  const [dateWarning, setDateWarning] = useState('');

  useEffect(() => {
    !field.value
      ? setDateWarning('Формат ДД.ММ.ГГГГ')
      : setDateWarning('')
  }, [field.value])

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
        value={field.value ? moment(field.value, "DD.MM.YYYY") : undefined}
        onChange={onChangeHandler}
      />
      {dateWarning && <p style={{color: '#D64040', fontSize: '12px', marginBottom: 0}}>{dateWarning}</p>}
    </>
  );
};

export default FastDatePicker;
