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
  startHour,
  endHour,
  showModal,
  speciality,
  client,
  orgId,
  currentDay,
  setCurrentDay
}) => {
  const rowContent = useMemo(() => {
    switch (mode) {
      case 'week':
        return new Array(rangeWeekNum).fill(0).map((_, index) => {   
          let date = addDays(currentDate, index);  
          let sdate = moment(date).format('YYYY-MM-DD');
          return (
            <ScheduleActionItem
              key={sdate}
              width={1}
              info={items.schedule[sdate] ? items.schedule[sdate][0]: null}
              mode={mode} 
              onModeChange={onModeChange}    
              date={date}
              client={client}
              setDay={setCurrentDay}
            />
          );
        });
      
      case 'day': 
        if(items.schedule[moment(currentDay).format('YYYY-MM-DD')]) {
          let tickets = items.schedule[moment(currentDay).format('YYYY-MM-DD')][0];
          let dur = moment.duration(tickets.endTime).subtract(moment.duration(tickets.begTime)).asMinutes();
          let k = Math.floor(dur / tickets.planned);
          let sdate = moment(currentDay).format('YYYY-MM-DD');
          let arr = new Array(tickets.planned).fill(0).map((_, index) => {
            return (
              <ScheduleActionItem
                key={index}
                width={1}
                ticket={tickets? tickets.tickets[index]: null}
                info={items.schedule[sdate] ? items.schedule[sdate][0]: null}
                date={currentDay}
                mode={mode}
                onModeChange={onModeChange}
                showModal={showModal}
                person={{fullName: items.person.lastName + ' ' + items.person.firstName + ' ' + items.person.patrName, id: items.person.id, speciality: speciality, org: items.person.orgStructure_id}}
                client={client}
                orgId={orgId}
                setDay={setCurrentDay}
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
              setDay={setCurrentDay}
              showModal={showModal}
              orgId={orgId}
            />
            {arr}
            <ScheduleActionItem
              width={ke}
              mode={mode}
              setDay={setCurrentDay}
              onModeChange={onModeChange} 
              showModal={showModal}
              orgId={orgId}
            />
          </>
      } else return <>       
        <ScheduleActionItem
          width={1}
          mode={mode}
          setDay={setCurrentDay}
          onModeChange={onModeChange} 
          showModal={showModal}
          orgId={orgId}
        /></>
    }
  }, [items, mode, rangeWeekNum, currentDate]);

  return <div className={'schedule-action-row'}>{rowContent}</div>;
};

export default ScheduleActionsRow;
