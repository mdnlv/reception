import React from 'react';
import {Card} from 'antd/lib';

import './styles.scss';
import {CardProps} from "./types";

import PersonInfoPane from './components/PersonInfoPane/PersonInfoPane';

const PatientInfoCard: React.FC<CardProps> = ({
  patient,
  policyTitle,
  isLoading,
  appointments
}) => {
  return (
    <Card className={'patient-info-card'}>
      {/*<Tabs defaultActiveKey="info" size={'small'}>
        <Tabs.TabPane tab="Инфо о пациенте" key="info">
        </Tabs.TabPane>
        <Tabs.TabPane tab="Прошедшие приемы" key="appointments">
          <PersonAppointmentsPane
            isLoading={isLoading}
            appointmentsList={appointments}
          />
        </Tabs.TabPane>
      </Tabs>      
      */}
      <PersonInfoPane
        policyTitle={policyTitle}
        patient={patient}
      />
    </Card>
  );
};

export default React.memo(PatientInfoCard);
