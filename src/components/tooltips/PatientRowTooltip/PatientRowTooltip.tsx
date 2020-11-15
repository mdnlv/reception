import React from 'react';
import moment from 'moment';

import './styles.scss';
import {TooltipProps} from "./types";

const PatientRowTooltip: React.FC<TooltipProps> = ({
  fullName,
  lastChange
}) => {
  const formattedDate = () => {
    return lastChange
      ? moment(lastChange).format('YYYY-MM-DD')
      : 'неизвестно';
  };

  return (
    <div className={'patient-tooltip'}>
      <div className="patient-tooltip__item date-item">
        <span className={'tooltip-item'}>дата последнего изменения:</span>
        <span className={'tooltip-value'}>{formattedDate()}</span>
      </div>
      <div className="patient-tooltip__item person-name-item">
        <span className={'tooltip-item'}>
          ФИО вносившего последние изменения:
        </span>
        <span className={'tooltip-value'}>
          {fullName ? fullName : 'неизвестно'}
        </span>
      </div>
    </div>
  );
};

export default PatientRowTooltip;
