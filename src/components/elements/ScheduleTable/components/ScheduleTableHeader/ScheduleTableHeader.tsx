import React, { useCallback } from 'react';
import DatePicker from './components/DatePicker/DatePicker';
import './styles.scss';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import Row from 'antd/lib/row';
import { ScheduleTableModeType } from '../../types';

interface HeaderProps {
  currentDate: Date;
  onDateChange(date: Date): void;
  onModeChange(mode: ScheduleTableModeType): void;
  onRangeWeekChange(date: Date): void;
  mode: ScheduleTableModeType;
  rangeWeekDate: Date;
}

const ScheduleTableHeader: React.FC<HeaderProps> = (props) => {
  const modeChangeHandler = useCallback(
    (e: RadioChangeEvent) => {
      props.onModeChange(e.target.value);
    },
    [props.onModeChange],
  );

  return (
    <Row
      className={'schedule-table__header'}
      justify={'space-between'}
      align={'middle'}>
      <div className={'schedule-date-picker'}>
        <DatePicker
          onRangeWeekChange={props.onRangeWeekChange}
          rangeWeekDate={props.rangeWeekDate}
          mode={props.mode}
          current={props.currentDate}
          onDateChange={props.onDateChange}
        />
      </div>
      <Radio.Group onChange={modeChangeHandler} value={props.mode}>
        <Radio value={'day'}>День</Radio>
        <Radio value={'week'}>Неделя</Radio>
      </Radio.Group>
    </Row>
  );
};

export default ScheduleTableHeader;
