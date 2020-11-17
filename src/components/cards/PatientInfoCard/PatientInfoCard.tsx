import React from 'react';
import {Card, Tabs} from 'antd/lib';

import './styles.scss';
import {CardProps} from "./types";

import PersonInfoPane from './components/tabsPanes/PersonInfoPane/PersonInfoPane';
import PersonAppointmentsPane from './components/tabsPanes/PersonAppointmentsPane/PersonAppointmentsPane';

const PatientInfoCard: React.FC<CardProps> = ({
  patient,
  policyTitle,
  isLoading,
  appointments
}) => {
  return (
    <Card className={'patient-info-card'}>
      <Tabs defaultActiveKey="info" size={'small'}>
        <Tabs.TabPane tab="Инфо о пациенте" key="info">
          <PersonInfoPane
            policyTitle={policyTitle}
            patient={patient}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Прошедшие приемы" key="appointments">
          <PersonAppointmentsPane
            isLoading={isLoading}
            appointmentsList={appointments}
          />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default React.memo(PatientInfoCard);
