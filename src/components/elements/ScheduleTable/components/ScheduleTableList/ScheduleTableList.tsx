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
}

const ScheduleTableList: React.FC<ListProps> = (props) => {
  const listContent = useMemo(() => {
    return props.list.map((item, index) => {
      const toggle = props.selected.find((sitem) => sitem === item.id);
      return (
        <ListItem
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
  }, [props.list, props.selected, props.mode]);

  return <div className={'schedule-list'}>{listContent}</div>;
};

export default ScheduleTableList;
