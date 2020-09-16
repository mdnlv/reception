import React from 'react';
import { Button, Descriptions, Row, Space } from 'antd';
import format from '../../../utils/date/format';
import PersonAppointment from '../../../types/data/PersonAppointment';

interface CardProps extends PersonAppointment {
  isExecuted?: boolean;
}

const PatientReceptionCard: React.FC<CardProps> = (props) => {
  const wrappedText = (item: string | undefined | null) => {
    if (!item) {
      return '-';
    } else {
      return item;
    }
  };

  const formattedDate = () => {
    return format(new Date(props.date), 'dd.MM.yyyy');
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
            {wrappedText(props.unit)}
          </Descriptions.Item>
          <Descriptions.Item label={'Тип приема'}>
            {wrappedText(props.type)}
          </Descriptions.Item>
          <Descriptions.Item label={'Специлизация'}>
            {wrappedText(props.specialization)}
          </Descriptions.Item>
          <Descriptions.Item label={'Врач'}>
            {wrappedText(props.doctor)}
          </Descriptions.Item>
        </Descriptions>
      </Row>
      {props.isExecuted && (
        <Row className={'patient-reception-card__actions'} justify={'end'}>
          {liveReceptionActions()}
        </Row>
      )}
    </div>
  );
};

export default PatientReceptionCard;
