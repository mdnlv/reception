import React from 'react';

import './styles.scss';
import {ItemProps} from "./types";

const ScheduleTimelineItem: React.FC<ItemProps> = ({
  mode,
  value,
  dayName
}) => {
  const content = () => {
    switch (mode) {
      case 'day':
        return (
          <div className={'schedule-timeline__item-time'}>{value}</div>
        );
      case 'week':
        return (
          <div className={'schedule-timeline__item-day'}>
            <div className="day-date">{value}</div>
            <div className="day-name">{dayName}</div>
          </div>
        );
    }
  };

  return (
    <div
      className={`schedule-timeline__item ${
        mode === 'week' && 'schedule-timeline__item--week'
      }`}>
      {content()}
    </div>
  );
};

export default ScheduleTimelineItem;
