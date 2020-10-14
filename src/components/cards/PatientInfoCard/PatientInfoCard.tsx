import React from 'react';
import { Card, Spin, Tabs } from 'antd';
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
    <>
      <Card className={'patient-info-card'}>
        <Tabs defaultActiveKey="1" size={'small'}>
          <Tabs.TabPane tab="Инфо о пациенте" key="1">
            <PersonInfoPane
              policyTitle={props.policyTitle}
              patient={props.patient}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Прошедшие приемы" key="2">
            <PersonAppointmentsPane
              isLoading={props.isLoading}
              appointmentsList={props.appointments}
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default PatientInfoCard;
