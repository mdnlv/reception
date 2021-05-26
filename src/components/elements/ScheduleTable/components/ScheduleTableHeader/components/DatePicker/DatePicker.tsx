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
import moment from 'moment';
import { ru } from 'date-fns/locale';
import DatePicker from 'antd/lib/date-picker';
import Popover from 'antd/lib/popover';
import Row from 'antd/lib/row';

import './styles.scss';
import {PickerProps, DateMode} from "./types";

const ScheduleDatePicker: React.FC<PickerProps> = ({
  current,
  onDateChange,
  onModeChange,
  onRangeWeekChange,
  mode,
  rangeWeekDate
}) => {
  const [visibleMode, setVisibleMode] = useState(false);

  const onDateModeChange = useCallback(() => {
    setVisibleMode((prevState) => !prevState);
  }, [setVisibleMode]);

  const dateContent = () => {
    if (mode === 'day') {
      return (
        <div>
          {format(current, 'd MMMM, EEEEEEE', {
            locale: ru,
          })}
        </div>
      );
    } else if (mode === 'week') {
      const lastDate = addDays(current, 14);
      if (isSameMonth(current, lastDate)) {
        return `${getWeekOfMonth(current)}-${getWeekOfMonth(
          lastDate,
        )} недели ${format(current, 'MMMM', {
          locale: ru,
        })}`;
      } else {
        return `${getWeekOfMonth(current)} неделя ${format(
          current,
          'MMMMMM',
          {
            locale: ru,
          },
        )} - ${getWeekOfMonth(lastDate)} неделя ${format(lastDate, 'MMMM', {
          locale: ru,
        })}`;
      }
    } else {
      return null;
    }
  };

  const onPickerDateChange = useCallback((_: unknown, dateString: string) => {
    if (dateString) {
      onDateChange(new Date(dateString));
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
        onDateChange(new Date(dateStrings[0]));
        onRangeWeekChange(new Date(dateStrings[1]));
      }
    },
    [],
  );

  const popoverContent = () => {
    if (mode === 'day') {
      return (
        <DatePicker
          onChange={onPickerDateChange}
          value={moment(current || new Date())}
        />
      );
    } else if (mode === 'week') {
      return (
        <DatePicker.RangePicker
          onChange={onRangePickerChange}
          value={[
            moment(current || new Date()),
            current < rangeWeekDate
              ? moment(rangeWeekDate || addDays(new Date(), 14))
              : moment(addDays(current, 14)),
          ]}
        />
      );
    }
  };

  return (
    <Row justify={'center'} align={'middle'}>
      {/*mode === 'day' && (
        <div
          onClick={() => {
            onDateChange(subDays(current, 1));
          }}
          className={'picker-action__wrapper'}>
          <LeftOutlined />
        </div>
        )*/}
      
      {mode === 'week' && <>{/*<div className={'schedule-date-picker__picker'}>
        <Popover
          placement={'bottom'}
          content={popoverContent()}
      trigger="click">*/}
         <div>{dateContent()}</div> {/*
        </Popover>
      </div>*/}</>}

      {mode === 'day' && (<>
        <div className='back' onClick={()=>{onModeChange('week'); onDateChange();}} > <LeftOutlined style={{ fontSize: '14px'}}/> Назад </div>
        <div>{dateContent()}</div>
      </>)}

      {/*mode === 'day' && (
        <div
          onClick={() => {
            onDateChange(addDays(current, 1));
          }}
          className={'picker-action__wrapper'}>
          <RightOutlined />
        </div>
        )*/}
    </Row>
  );
};

export default ScheduleDatePicker;
