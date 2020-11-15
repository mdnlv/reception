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
  rangeWeekNum
}) => {
  const listContent = useMemo(() => {
    return list.map((item, index) => {
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
          name={item.personName}
          planned={item.planned}
          items={item.items}
        />
      );
    });
  }, [list, selected, mode, rangeWeekNum]);

  return <div className={'schedule-list'}>{listContent}</div>;
};

export default ScheduleTableList;
