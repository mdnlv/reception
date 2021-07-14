import React from 'react';
import { addDays } from 'date-fns';

import './styles.scss';
import format from '../../../../../utils/date/format';
import {TimeLineProps} from "./types";

import ScheduleTimelineItem from './components/ScheduleTimilineItem/ScheduleTimelineItem';

const ScheduleTimeline: React.FC<TimeLineProps> = ({
  mode,
  currentDate,
  rangeWeekNum,
  startHour,
  endHour,
  length
}) => {
  const content = () => {
    switch (mode) {
      case 'day':
        
        const timeItems = [];

        for (let i = startHour * 60; i <= 60 * endHour; i += 60) {
          const fullHours = Math.floor(i / 60);
          const minutesValue =
            i - fullHours * 60 === 0 ? '00' : `${i - fullHours * 60}`;
          const timeValue =
            fullHours < 10
              ? `0${fullHours}:${minutesValue}`
              : `${fullHours}:${minutesValue}`;
          timeItems.push(
            <div key={i} className={'timeline-list__item'}>
              {i % 60 === 0 && (
                <ScheduleTimelineItem mode={'day'} value={timeValue} />
              )}
            </div>,
          );
        }

        return timeItems;

      case 'week':
        const dayItems = [];
        for (let i = 0; i < rangeWeekNum; i++) {
          const dateString = format(addDays(currentDate, i), length == 'week'? 'dd.MM' : 'dd');
          const dayName = format(addDays(currentDate, i), 'EEEEEE');

          dayItems.push(
            <li key={i} className={'timeline-list__item--week'}>
              <ScheduleTimelineItem
                mode={'week'}
                value={dateString}
                dayName={dayName}
              />
            </li>,
          );
        }

        return dayItems;
    }
  };

  return (
    <div className={'schedule-timeline'}>
      <nav className={'schedule-timeline__list'}>{content()}</nav>
    </div>
  );
};

export default ScheduleTimeline;
