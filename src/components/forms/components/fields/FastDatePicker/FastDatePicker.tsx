import React from 'react';
import {useField} from 'formik';
import ReactDatePicker, {registerLocale} from 'react-datepicker';
import { MaskedInput } from 'antd-mask-input';
import ru from "date-fns/locale/ru";
import {PickerProps} from "./types";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);

const FastDatePicker: React.FC<PickerProps> = (props) => {
  const [field, meta, form] = useField<Date>(props.name);

  const selectedDate = field.value ? new Date(field.value) : null

  return (
    <ReactDatePicker
      onChange={(date: Date) => {
        props.setDate && props.setDate(date);
        props.onSelectDate && props.onSelectDate();
        return form.setValue(date)
      }}
      locale='ru'
      selected={selectedDate}
      placeholderText="ДД.ММ.ГГГГ"
      isClearable={Boolean(field.value)}
      todayButton={"Сегодня"}
      maxDate={!props.beforeToday ? null : new Date()}
      minDate={!props.afterToday ? null : new Date()}
      dateFormat="dd.MM.yyyy"
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      popperPlacement="top-end"
      popperProps={{
        positionFixed: true // use this to make the popper position: fixed
      }}
      popperModifiers={{
        offset: {
          enabled: true,
          offset: "5px, 10px"
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
          boundariesElement: "viewport"
        }
      }}
      customInput={
        <MaskedInput
          style={
            Boolean(meta.error && meta.touched)
            ? {
                border: '1px solid red',
                backgroundColor: 'rgba(255, 0, 0, 0.1)'
              }
            : {}
          }
          name={props.name}
          type="text"
          mask='11.11.1111'
        />
      }
    />
  );
};

export default FastDatePicker;
