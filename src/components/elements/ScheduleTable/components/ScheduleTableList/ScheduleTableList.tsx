import React, { useMemo } from 'react';

import './styles.scss';
import {ListProps} from "./types";

import ListItem from './components/ListItem/ListItem';

const ScheduleTableList: React.FC<ListProps> = ({
  list,
  onNewScheduleItem,
  onToggleRow,
  selected,
  mode,
  rangeWeekNum,
  person_tree,
  loadSchedule,
  currentDate, 
  rangeWeekDate,
  onDateChange,
  onModeChange,
  startHour,
  endHour,
  speciality
}) => {
  const listContent = useMemo(() => {
    return person_tree.map((item, index) => {
      const toggle = selected.find((sitem) => sitem === item.id);
      return (
        <ListItem
          rangeWeekNum={rangeWeekNum}
          mode={mode}
          toggle={!!toggle}
          id={item.id}
          onToggle={onToggleRow}
          key={item.id + index}
          onNewScheduleItem={onNewScheduleItem}
          name={item.name}
          child={item.child}
          person_list={item.person_list}  
          selected={selected}
          level={0} 
          loadSchedule={loadSchedule}
          schedule={list}
          currentDate={currentDate}
          rangeWeekDate={rangeWeekDate}
          onDateChange={onDateChange}
          onModeChange={onModeChange}
          startHour={startHour}
          endHour={endHour}
          speciality={speciality}
        />
      );
    });
  }, [list, selected, mode, rangeWeekNum, person_tree]);

  return <div className={'schedule-list'}>{listContent}</div>;
};

export default ScheduleTableList;
