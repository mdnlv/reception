import React from 'react';
import {Button, Descriptions, Row, Space} from 'antd/lib';

import format from '../../../utils/date/format';
import {CardProps} from "./types";

const PatientReceptionCard: React.FC<CardProps> = ({
  isExecuted,
  date,
  unit,
  type,
  specialization,
  doctor
}) => {
  const wrappedText = (item: string | undefined | null) => {
    if (!item) {
      return '-';
    } else {
      return item;
    }
  };

  const formattedDate = () => {
    return format(new Date(date), 'dd.MM.yyyy');
  };

  const liveReceptionActions = () => {
    return (
      <Space>
        <Button size={'small'} type="primary" danger>
          Отменить
        </Button>
        <Button size={'small'} type="primary" className={'save-btn'}>
          Перенести
        </Button>
      </Space>
    );
  };

  return (
    <div>
      <Row>
        <Descriptions
          className={'patient-reception-card'}
          size={'small'}
          column={3}
          layout={'vertical'}>
          <Descriptions.Item label={'Дата'}>
            {formattedDate()}
          </Descriptions.Item>
          <Descriptions.Item label={'Подразделение'}>
            {wrappedText(unit)}
          </Descriptions.Item>
          <Descriptions.Item label={'Тип приема'}>
            {wrappedText(type)}
          </Descriptions.Item>
          <Descriptions.Item label={'Специлизация'}>
            {wrappedText(specialization)}
          </Descriptions.Item>
          <Descriptions.Item label={'Врач'}>
            {wrappedText(doctor)}
          </Descriptions.Item>
        </Descriptions>
      </Row>
      {isExecuted && (
        <Row className={'patient-reception-card__actions'} justify={'end'}>
          {liveReceptionActions()}
        </Row>
      )}
    </div>
  );
};

export default PatientReceptionCard;
