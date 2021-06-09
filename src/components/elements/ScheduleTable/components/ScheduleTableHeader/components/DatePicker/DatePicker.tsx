import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  addDays,
  format,
  getWeekOfMonth,
  isSameMonth,
  subDays
} from 'date-fns';
import { ru } from 'date-fns/locale';
import Row from 'antd/lib/row';
import moment from "moment";
import './styles.scss';
import {PickerProps} from "./types";

const ScheduleDatePicker: React.FC<PickerProps> = ({
  current,
  currentDay,
  onDateChange,
  onModeChange,
  mode,
  length
}) => {
  const dateContent = () => {
    if (mode === 'day') {
      return (
        <div>
          {format(currentDay, 'd MMMM, EEEEEEE', {
            locale: ru,
          })}
        </div>
      );
    } else if (mode === 'week') {
      if(length == 'week') {
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
        return `${moment(current).locale('ru').format('MMMM')}`;
      }
    } else {
      return null;
    }
  };

  return (
    <Row justify={'center'} align={'middle'}>   
      {mode === 'week' && <>
      <div
        onClick={() => {
          if(length == 'week') {
            onDateChange(subDays(current, 14), subDays(current,1));
          } else {
            onDateChange(moment(subDays(current,1)).clone().startOf('month').toDate(), moment(subDays(current,1)).clone().endOf('month').toDate());
          }
        }}
        className={'picker-action__wrapper'}>
        <LeftOutlined style={{ fontSize: '12px'}}/>
      </div>

      <div className={'schedule-date-picker__picker'}>
         <div>{dateContent()}</div> 
      </div>

      <div
        onClick={() => {
          if(length == 'week') {
            onDateChange(addDays(current, 14), addDays(current,27));
          } else {
            onDateChange(moment(addDays(current,32)).clone().startOf('month').toDate(), moment(addDays(current,32)).clone().endOf('month').toDate());
          }
        }}
        className={'picker-action__wrapper'}>
        <RightOutlined style={{ fontSize: '12px'}}/>
      </div>
      </>}

      {mode === 'day' && <>
        <div className='back' onClick={()=>{onModeChange('week');}} > 
        <LeftOutlined style={{ fontSize: '12px'}}/> 
        Назад 
        </div>
        <div>{dateContent()}</div>
      </>}
    </Row>
  );
};

export default ScheduleDatePicker;
