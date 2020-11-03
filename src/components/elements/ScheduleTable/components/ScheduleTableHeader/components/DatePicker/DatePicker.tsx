import React, { useCallback, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  addDays,
  eachDayOfInterval,
  format,
  getWeekOfMonth,
  isSameMonth,
  subDays,
} from 'date-fns';
import './styles.scss';
import moment from 'moment';
import { ru } from 'date-fns/locale';
import { ScheduleTableModeType } from '../../../../types';
import DatePicker from 'antd/lib/date-picker';
import Popover from 'antd/lib/popover';
import Row from 'antd/lib/row';

interface PickerProps {
  current: Date;
  onDateChange(date: Date): void;
  onRangeWeekChange(date: Date): void;
  mode: ScheduleTableModeType;
  rangeWeekDate: Date;
}

type DateMode = 'default' | 'detailed';

const ScheduleDatePicker: React.FC<PickerProps> = (props) => {
  const [visibleMode, setVisibleMode] = useState(false);

  const onDateModeChange = useCallback(() => {
    setVisibleMode((prevState) => !prevState);
  }, [setVisibleMode]);

  const dateContent = () => {
    if (props.mode === 'day') {
      return (
        <div>
          {format(props.current, 'EEEEEE d MMMM', {
            locale: ru,
          })}
        </div>
      );
    } else if (props.mode === 'week') {
      const lastDate = addDays(props.current, 14);
      if (isSameMonth(props.current, lastDate)) {
        return `${getWeekOfMonth(props.current)}-${getWeekOfMonth(
          lastDate,
        )} недели ${format(props.current, 'MMM', {
          locale: ru,
        })}`;
      } else {
        return `${getWeekOfMonth(props.current)} неделя(${format(
          props.current,
          'MMM',
          {
            locale: ru,
          },
        )}) - ${getWeekOfMonth(lastDate)} неделя(${format(lastDate, 'MMM', {
          locale: ru,
        })})`;
      }
    } else {
      return null;
    }
  };

  const onPickerDateChange = useCallback((_: unknown, dateString: string) => {
    if (dateString) {
      props.onDateChange(new Date(dateString));
    }
  }, []);

  const onRangePickerChange = useCallback(
    (_: unknown, dateStrings: [string, string]) => {
      if (
        eachDayOfInterval({
          start: new Date(dateStrings[0]),
          end: new Date(dateStrings[1]),
        }).length -
          1 <=
          14 &&
        dateStrings[0] &&
        dateStrings[1]
      ) {
        props.onDateChange(new Date(dateStrings[0]));
        props.onRangeWeekChange(new Date(dateStrings[1]));
      }
    },
    [],
  );

  const popoverContent = () => {
    if (props.mode === 'day') {
      return (
        <DatePicker
          onChange={onPickerDateChange}
          value={moment(props.current || new Date())}
        />
      );
    } else if (props.mode === 'week') {
      return (
        <DatePicker.RangePicker
          onChange={onRangePickerChange}
          value={[
            moment(props.current || new Date()),
            props.current < props.rangeWeekDate
              ? moment(props.rangeWeekDate || addDays(new Date(), 14))
              : moment(addDays(props.current, 14)),
          ]}
        />
      );
    }
  };

  return (
    <Row justify={'center'} align={'middle'}>
      {props.mode === 'day' && (
        <div
          onClick={() => {
            props.onDateChange(subDays(props.current, 1));
          }}
          className={'picker-action__wrapper'}>
          <LeftOutlined />
        </div>
      )}
      <div className={'schedule-date-picker__picker'}>
        <Popover
          placement={'bottom'}
          content={popoverContent()}
          trigger="click">
          <div>{dateContent()}</div>
        </Popover>
      </div>
      {props.mode === 'day' && (
        <div
          onClick={() => {
            props.onDateChange(addDays(props.current, 1));
          }}
          className={'picker-action__wrapper'}>
          <RightOutlined />
        </div>
      )}
    </Row>
  );
};

export default ScheduleDatePicker;
