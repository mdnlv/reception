import React from 'react';
import { Card, Spin, Tabs } from 'antd';
import PersonInfoPane from './components/tabsPanes/PersonInfoPane/PersonInfoPane';
import './styles.scss';
import PersonAppointmentsPane from './components/tabsPanes/PersonAppointmentsPane/PersonAppointmentsPane';
import moment from 'moment';
import Patient from '../../../types/data/Patient';

type CardProps = {
  patient?: Patient;
  policyTitle?: string;
  isLoading: boolean;
};

const PatientInfoCard: React.FC<CardProps> = (props) => {
  return (
    <>
      <Card className={'patient-info-card'}>
        {props.isLoading ? (
          <div className={'spinner-wrapper'}>
            <Spin size="large" />
          </div>
        ) : (
          <Tabs defaultActiveKey="1" size={'small'}>
            <Tabs.TabPane tab="Инфо о пациенте" key="1">
              <PersonInfoPane
                policyTitle={props.policyTitle}
                patient={props.patient}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Прошедшие приемы" key="2">
              <PersonAppointmentsPane
                appointmentsList={[
                  {
                    id: '1',
                    date: moment(0).toDate(),
                    type: 'test',
                    specialization: 'test',
                    doctor: 'test',
                    unit: 'test',
                  },
                ]}
              />
            </Tabs.TabPane>
          </Tabs>
        )}
      </Card>
    </>
  );
};

export default PatientInfoCard;
