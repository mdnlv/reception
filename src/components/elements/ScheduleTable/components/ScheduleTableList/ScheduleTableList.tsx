import React, { useMemo } from 'react';
import { ScheduleListItem, ScheduleTableModeType } from '../../ScheduleTable';
import ListItem from './components/ListItem/ListItem';
import './styles.scss';

interface ListProps {
  list: ScheduleListItem[];
  onNewScheduleItem(): void;
  onToggleRow(id: number): void;
  selected: number[];
  mode: ScheduleTableModeType;
  rangeWeekNum: number;
}

const ScheduleTableList: React.FC<ListProps> = (props) => {
  const listContent = useMemo(() => {
    return props.list.map((item, index) => {
      const toggle = props.selected.find((sitem) => sitem === item.id);
      return (
        <ListItem
          rangeWeekNum={props.rangeWeekNum}
          mode={props.mode}
          toggle={!!toggle}
          id={item.id}
          onToggle={props.onToggleRow}
          key={item.id + index}
          onNewScheduleItem={props.onNewScheduleItem}
          name={item.personName}
          planned={item.planned}
          items={item.items}
        />
      );
    });
  }, [props.list, props.selected, props.mode, props.rangeWeekNum]);

  return <div className={'schedule-list'}>{listContent}</div>;
};

export default ScheduleTableList;
