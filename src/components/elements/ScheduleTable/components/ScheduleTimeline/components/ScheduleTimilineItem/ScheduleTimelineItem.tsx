import React from 'react';
import { ScheduleTableModeType } from '../../../../ScheduleTable';
import './styles.scss';

interface ItemProps {
  mode: ScheduleTableModeType;
  value: string;
  dayName?: string;
}

const ScheduleTimelineItem: React.FC<ItemProps> = (props) => {
  const content = () => {
    switch (props.mode) {
      case 'day':
        return (
          <div className={'schedule-timeline__item-time'}>{props.value}</div>
        );
      case 'week':
        return (
          <div className={'schedule-timeline__item-day'}>
            <div className="day-date">{props.value}</div>
            <div className="day-name">{props.dayName}</div>
          </div>
        );
    }
  };

  return (
    <div
      className={`schedule-timeline__item ${
        props.mode === 'week' && 'schedule-timeline__item--week'
      }`}>
      {content()}
    </div>
  );
};

export default ScheduleTimelineItem;
