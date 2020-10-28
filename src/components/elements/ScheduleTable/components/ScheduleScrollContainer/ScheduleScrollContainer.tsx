import React from 'react';
import './styles.scss';

interface ScrollProps {
  left: number;
}

const ScheduleScrollContainer: React.FC<ScrollProps> = (props) => {
  return (
    <div className={'schedule-scroll-container'}>
      <div
        style={{ left: props.left }}
        className="schedule-scroll-container__content">
        {props.children}
      </div>
    </div>
  );
};

export default ScheduleScrollContainer;
