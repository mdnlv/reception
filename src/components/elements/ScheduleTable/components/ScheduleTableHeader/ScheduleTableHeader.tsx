import React, { useCallback } from 'react';
import { Row, Radio } from 'antd';
import DatePicker from './components/DatePicker/DatePicker';
import './styles.scss';
import { ScheduleTableModeType } from '../../ScheduleTable';
import { RadioChangeEvent } from 'antd/es/radio';

interface HeaderProps {
  currentDate: Date;
  onDateChange(date: Date): void;
  onModeChange(mode: ScheduleTableModeType): void;
  mode: ScheduleTableModeType;
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
      <div className={'header-date-picker'}>
        <DatePicker
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
