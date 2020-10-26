import React from 'react';
import './styles.scss';
import { ScheduleTableModeType } from '../../ScheduleTable';
import ScheduleTimelineItem from './components/ScheduleTimilineItem/ScheduleTimelineItem';
import { addDays, addWeeks } from 'date-fns';
import format from '../../../../../utils/date/format';

interface TimeLineProps {
  mode: ScheduleTableModeType;
  currentDate: Date;
}

const ScheduleTimeline: React.FC<TimeLineProps> = (props) => {
  const content = () => {
    switch (props.mode) {
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
        for (let i = 0; i < 14; i++) {
          const dateString = format(addDays(props.currentDate, i), 'MM.dd');
          const dayName = format(addDays(props.currentDate, i), 'EEEEEE');
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
