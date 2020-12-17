import React, {useCallback, useEffect, useState} from 'react';
import {useField} from 'formik';
import {DatePicker} from 'antd';
import moment from 'moment';

import {PickerProps} from "./types";

const FastDatePicker: React.FC<PickerProps> = (props) => {
  const [field, meta, form] = useField<string>(props.name);
  const [dateWarning, setDateWarning] = useState('');

  useEffect(() => {
    console.log('field.value', field.value);
    console.log('moment field.value', moment(field.value, "YYYY-MM-DD").format("YYYY-MM-DD"))
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
        // defaultValue={moment(moment(), "DD.MM.YYYY")}
        allowClear
        format={"DD.MM.YYYY"}
        // value={field.value ? moment(field.value) : undefined}
        onChange={onChangeHandler}
      />
      {dateWarning && <p style={{color: '#D64040', fontSize: '12px', marginBottom: 0}}>{dateWarning}</p>}
    </>
  );
};

export default FastDatePicker;
