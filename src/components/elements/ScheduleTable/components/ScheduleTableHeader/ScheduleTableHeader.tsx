import React, { useCallback } from 'react';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import Row from 'antd/lib/row';
import moment from "moment";

import './styles.scss';
import {HeaderProps} from "./types";

import DatePicker from './components/DatePicker/DatePicker';
import { addDays } from 'date-fns';

const ScheduleTableHeader: React.FC<HeaderProps> = ({
  mode,
  currentDate,
  onDateChange,
  onModeChange,
  currentDay,
  length,
  setLength
}) => {
  const modeChangeHandler = useCallback(
    (e: RadioChangeEvent) => {
      e.target.value == 'month' ? onDateChange(moment().clone().startOf(e.target.value).toDate(), moment().clone().endOf(e.target.value).toDate())
      : onDateChange(moment().clone().startOf(e.target.value).toDate(), addDays(moment().clone().endOf(e.target.value).toDate(), 7));
      setLength(e.target.value)
    },
    [onModeChange],
  );

  return (
    <Row
      className={'schedule-table__header'}
      justify={'space-between'}
      align={'middle'}>
      <div className={'schedule-date-picker'}>
        <DatePicker
          mode={mode}
          current={currentDate}
          onDateChange={onDateChange}
          onModeChange={onModeChange}
          length={length}
          currentDay={currentDay}
        />
      </div>
      
      <Radio.Group onChange={modeChangeHandler} value={length}>
        <Radio value={'week'}>2 недели</Radio>
        <Radio value={'month'}>месяц</Radio>
      </Radio.Group>
    </Row>
  );
};

export default ScheduleTableHeader;
