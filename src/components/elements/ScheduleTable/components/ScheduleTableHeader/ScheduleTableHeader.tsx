import React, { useCallback } from 'react';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import Row from 'antd/lib/row';

import './styles.scss';
import {HeaderProps} from "./types";

import DatePicker from './components/DatePicker/DatePicker';

const ScheduleTableHeader: React.FC<HeaderProps> = ({
  currentDate,
  onDateChange,
  onModeChange,
  onRangeWeekChange,
  mode,
  rangeWeekDate
}) => {
  const modeChangeHandler = useCallback(
    (e: RadioChangeEvent) => {
      onModeChange(e.target.value);
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
          onRangeWeekChange={onRangeWeekChange}
          rangeWeekDate={rangeWeekDate}
          mode={mode}
          current={currentDate}
          onDateChange={onDateChange}
          onModeChange={onModeChange}
        />
      </div>
      
      <Radio.Group onChange={modeChangeHandler} value={mode}>
        <Radio value={'day'}>День</Radio>
        <Radio value={'week'}>Неделя</Radio>
      </Radio.Group>
    </Row>
  );
};

export default ScheduleTableHeader;
