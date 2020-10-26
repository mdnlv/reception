import React from 'react';
import { Row } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ScheduleTableModeType } from '../../../../ScheduleTable';
import {
  addDays,
  format,
  getWeekOfMonth,
  isSameMonth,
  subDays,
} from 'date-fns';
import './styles.scss';

interface PickerProps {
  current: Date;
  onDateChange(date: Date): void;
  mode: ScheduleTableModeType;
}

const DatePicker: React.FC<PickerProps> = (props) => {
  const dateContent = () => {
    if (props.mode === 'day') {
      return <div>{format(props.current, 'yyyy-MM-dd')}</div>;
    } else if (props.mode === 'week') {
      const lastDate = addDays(props.current, 14);
      if (isSameMonth(props.current, lastDate)) {
        return `${getWeekOfMonth(props.current)}-${getWeekOfMonth(
          lastDate,
        )} недели ${format(props.current, 'MMM')}`;
      } else {
        return `${getWeekOfMonth(props.current)} неделя(${format(
          props.current,
          'MMM',
        )}) - ${getWeekOfMonth(lastDate)} неделя(${format(lastDate, 'MMM')})`;
      }
    }
  };

  return (
    <Row justify={'center'} align={'middle'}>
      <div
        onClick={() => {
          props.onDateChange(subDays(props.current, 1));
        }}
        className={'picker-action__wrapper'}>
        <LeftOutlined />
      </div>
      <div>{dateContent()}</div>
      <div
        onClick={() => {
          props.onDateChange(addDays(props.current, 1));
        }}
        className={'picker-action__wrapper'}>
        <RightOutlined />
      </div>
    </Row>
  );
};

export default DatePicker;
