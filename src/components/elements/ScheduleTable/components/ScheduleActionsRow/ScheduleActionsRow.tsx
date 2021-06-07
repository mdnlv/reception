import React, { useMemo } from 'react';
import { addDays } from 'date-fns';
import moment from 'moment';
import './styles.scss';
import {RowProps} from "./types";
import ScheduleActionItem from '../ScheduleActionItem/ScheduleActionItem';

const ScheduleActionsRow: React.FC<RowProps> = ({
  items,
  mode,
  rangeWeekNum,
  currentDate,
  onModeChange,
  onDateChange,
  startHour,
  endHour,
  showModal,
  speciality,
  client
}) => {

  const rowContent = useMemo(() => {
    switch (mode) {
      case 'week':
        return new Array(rangeWeekNum).fill(0).map((_, index) => {   
          let date = addDays(new Date(), index);  
          let sdate = moment(date).format('YYYY-MM-DD');
          return (
            <ScheduleActionItem
              key={sdate}
              width={1}
              info={items.schedule[sdate] ? items.schedule[sdate][0]: null}
              mode={mode} 
              onModeChange={onModeChange} 
              onDateChange={onDateChange}   
              date={date}
              client={client}
            />
          );
        });
      
      case 'day': 
        let tickets = items.schedule[moment(currentDate).format('YYYY-MM-DD')][0];
        let dur = moment.duration(tickets.endTime).subtract(moment.duration(tickets.begTime)).asMinutes();
        let k = Math.floor(dur / tickets.planned);
        let sdate = moment(currentDate).format('YYYY-MM-DD');
        let arr = new Array(tickets.planned).fill(0).map((_, index) => {
          return (
            <ScheduleActionItem
              key={index}
              width={1}
              ticket={tickets? tickets.tickets[index]: null}
              info={items.schedule[sdate] ? items.schedule[sdate][0]: null}
              date={currentDate}
              mode={mode}
              onModeChange={onModeChange}
              onDateChange={onDateChange} 
              showModal={showModal}
              person={{fullName: items.person.lastName + ' ' + items.person.firstName + ' ' + items.person.patrName, id: items.person.id, speciality: speciality, org: items.person.orgStructure_id}}
              client={client}
            />
          );
        });
        let kb = Math.floor((moment.duration(tickets.begTime).asMinutes() - startHour*60) / k);
        let ke = Math.floor((endHour*60 - moment.duration(tickets.endTime).asMinutes()) / k);
        return <>
          <ScheduleActionItem
            width={kb}
            mode={mode}
            onModeChange={onModeChange}
            onDateChange={onDateChange} 
            showModal={showModal}
          />
          {arr}
          <ScheduleActionItem
            width={ke}
            mode={mode}
            onModeChange={onModeChange}
            onDateChange={onDateChange} 
            showModal={showModal}
          />
        </>
    }
  }, [items, mode, rangeWeekNum]);

  return <div className={'schedule-action-row'}>{rowContent}</div>;
};

export default ScheduleActionsRow;
