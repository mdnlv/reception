import React from 'react';

import './styles.scss';
import {ScrollProps} from "./types";

const ScheduleScrollContainer: React.FC<ScrollProps> = ({left, children}) => {
  return (
    <div className={'schedule-scroll-container'}>
      <div
        style={{ left: left }}
        className="schedule-scroll-container__content">
        {children}
      </div>
    </div>
  );
};

export default ScheduleScrollContainer;
