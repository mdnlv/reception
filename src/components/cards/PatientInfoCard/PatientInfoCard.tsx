import React, {FunctionComponent} from 'react'
import {Card, Descriptions, Tabs} from "antd";
import PersonInfoPane from "./components/tabsPanes/PersonInfoPane/PersonInfoPane";
import './styles.scss'
import PersonAppointmentsPane from "./components/tabsPanes/PersonAppointmentsPane/PersonAppointmentsPane";
import moment from "moment";

type CardProps = {
    patient?: any
}


const PatientInfoCard: React.FC = (props) => {

    return (
        <Card className={'patient-info-card'}>
            <Tabs defaultActiveKey="1" size={"small"}>
                <Tabs.TabPane tab="Инфо о пациенте" key="1">
                    <PersonInfoPane patient={{}}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Прошедшие приемы" key="2">
                    <PersonAppointmentsPane appointmentsList={[
                        {
                            id: '1',
                            date: moment(0).toDate(),
                            type: 'test',
                            specialization: 'test',
                            doctor: 'test',
                            unit: 'test'
                        }
                    ]} />
                </Tabs.TabPane>
            </Tabs>
        </Card>
    )
}

export default PatientInfoCard
