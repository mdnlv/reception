import React, { useEffect, useMemo, useState } from 'react';
import { addDays } from 'date-fns';
import moment from 'moment';
import './styles.scss';
import {RowProps} from "./types";
import ScheduleActionItem from '../ScheduleActionItem/ScheduleActionItem';

const ScheduleActionsRow: React.FC<RowProps> = ({
  items,
  onNewScheduleItem,
  mode,
  rangeWeekNum,
  currentDate,
  onModeChange,
  onDateChange,
  startHour,
  endHour
}) => {

  const rowContent = useMemo(() => {
    switch (mode) {
      
      case 'week':
        return new Array(rangeWeekNum).fill(0).map((item, index) => {   
          let date = addDays(new Date(), index);  
          let sdate = moment(date).format('YYYY-MM-DD');
          return (
            <ScheduleActionItem
              key={sdate}
              onNewScheduleItem={onNewScheduleItem}
              width={1}
              info={items.schedule[sdate] ? items.schedule[sdate][0]: null}
              mode={mode} 
              onModeChange={onModeChange} 
              onDateChange={onDateChange}   
              date={date}
            />
          );
        });
      
      case 'day': 
        let tickets = items.schedule[moment(currentDate).format('YYYY-MM-DD')][0];
        let dur = moment.duration(tickets.endTime).subtract(moment.duration(tickets.begTime)).asMinutes();
        let k = Math.floor(dur / tickets.planned);
        let arr = new Array(tickets.planned).fill(0).map((item, index) => {
            return (
              <ScheduleActionItem
                key={index}
                width={1}
                onNewScheduleItem={onNewScheduleItem}
                tickets={tickets? tickets.tickets[index]: null}
                mode={mode}
                onModeChange={onModeChange}
                onDateChange={onDateChange} 
              />
            );
        });
        let kb = Math.floor((moment.duration(tickets.begTime).asMinutes() - startHour*60) / k);
        let ke = Math.floor((endHour*60 - moment.duration(tickets.endTime).asMinutes()) / k);
        console.log(kb)
        console.log(ke)
        return <>
          <ScheduleActionItem
            width={kb}
            onNewScheduleItem={onNewScheduleItem}
            mode={mode}
            onModeChange={onModeChange}
            onDateChange={onDateChange} 
          />
          {arr}
          <ScheduleActionItem
            width={ke}
            onNewScheduleItem={onNewScheduleItem}
            mode={mode}
            onModeChange={onModeChange}
            onDateChange={onDateChange} 
          />
        </>
    }
  }, [items, mode, rangeWeekNum]);

  return <div className={'schedule-action-row'}>{rowContent}</div>;
};

export default ScheduleActionsRow;
