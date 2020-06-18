import React, {FunctionComponent} from 'react'
import {Card, Descriptions, Tabs} from "antd";
import PersonInfoPane from "./components/tabsPanes/PersonInfoPane/PersonInfoPane";
import './styles.scss'
import PersonAppointmentsPane from "./components/tabsPanes/PersonAppointmentsPane/PersonAppointmentsPane";

const PatientInfoCard: React.FC = (props) => {

    return (
        <Card className={'patient-info-card'}>
            <Tabs defaultActiveKey="1" size={"small"}>
                <Tabs.TabPane tab="Инфо о пациенте" key="1">
                    <PersonInfoPane patient={{}}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Прошедшие приемы" key="2">
                    <PersonAppointmentsPane />
                </Tabs.TabPane>
            </Tabs>
        </Card>
    )
}

export default PatientInfoCard
