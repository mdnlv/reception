import React from 'react';
import { Card, Tabs } from 'antd/lib';
import PersonInfoPane from './components/tabsPanes/PersonInfoPane/PersonInfoPane';
import './styles.scss';
import PersonAppointmentsPane from './components/tabsPanes/PersonAppointmentsPane/PersonAppointmentsPane';
import Patient from '../../../types/data/Patient';
import PersonAppointment from '../../../types/data/PersonAppointment';

type CardProps = {
  patient?: Patient;
  policyTitle?: string;
  isLoading: boolean;
  appointments?: PersonAppointment[];
};

const PatientInfoCard: React.FC<CardProps> = (props) => {
  return (
    <Card className={'patient-info-card'}>
      <Tabs defaultActiveKey="info" size={'small'}>
        <Tabs.TabPane tab="Инфо о пациенте" key="info">
          <PersonInfoPane
            policyTitle={props.policyTitle}
            patient={props.patient}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Прошедшие приемы" key="appointments">
          <PersonAppointmentsPane
            isLoading={props.isLoading}
            appointmentsList={props.appointments}
          />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default React.memo(PatientInfoCard);
