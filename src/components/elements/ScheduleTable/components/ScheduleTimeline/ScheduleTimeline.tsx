import React from 'react';
import { addDays } from 'date-fns';

import './styles.scss';
import format from '../../../../../utils/date/format';
import {TimeLineProps} from "./types";

import ScheduleTimelineItem from './components/ScheduleTimilineItem/ScheduleTimelineItem';

const ScheduleTimeline: React.FC<TimeLineProps> = ({
  mode,
  currentDate,
  rangeWeekNum
}) => {
  const content = () => {
    switch (mode) {
      case 'day':
        const startHour = 9;
        const endHour = 17;
        const timeItems = [];

        for (let i = startHour * 60; i <= 60 * endHour; i += 20) {
          const fullHours = Math.floor(i / 60);
          const minutesValue =
            i - fullHours * 60 === 0 ? '00' : `${i - fullHours * 60}`;
          const timeValue =
            fullHours < 10
              ? `0${fullHours}:${minutesValue}`
              : `${fullHours}:${minutesValue}`;
          timeItems.push(
            <li key={i} className={'timeline-list__item'}>
              {i % 20 === 0 && (
                <ScheduleTimelineItem mode={'day'} value={timeValue} />
              )}
            </li>,
          );
        }

        return timeItems;

      case 'week':
        const dayItems = [];
        for (let i = 0; i < rangeWeekNum; i++) {
          const dateString = format(addDays(currentDate, i), 'MM.dd');
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
