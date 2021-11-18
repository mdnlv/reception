import React, { useCallback } from 'react';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import Row from 'antd/lib/row';
import moment from "moment";
import { addDays } from 'date-fns';

import './styles.scss';
import {HeaderProps} from "./types";

import DatePicker from './components/DatePicker/DatePicker';

const ScheduleTableHeader: React.FC<HeaderProps> = ({
  mode,
  currentDate,
  onDateChange,
  onModeChange,
  currentDay,
  length,
  setLength,
  selected
}) => {
  const modeChangeHandler =
    (e: RadioChangeEvent) => {
      e.target.value == 'month' ? onDateChange(currentDate, moment().clone().endOf(e.target.value).toDate())
      : onDateChange(currentDate, addDays(currentDate, 14));
      setLength(e.target.value)
    };

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
          selected={selected}
        />
      </div>

    {mode == 'week' && <Radio.Group onChange={modeChangeHandler} value={length}>
        <Radio value={'week'}>2 недели</Radio>
        <Radio value={'month'}>месяц</Radio>
      </Radio.Group>}
    </Row>
  );
};

export default ScheduleTableHeader;
