import React from 'react'
import './styles.scss'
import {Col, Row} from "antd";
import PatientMedInfoCard from "../../components/cards/PatientMedInfoCard/PatientMedInfoCard";
import PatientHappenings from "../../components/cards/PatientHappenings/PatientHappenings";

const PatientCard: React.FC = (props) => {
    return (
        <Row className={'patient-card-page'}>
            <Col span={8} className={'patient-card-page__info'}>
                <PatientMedInfoCard/>
            </Col>
            <Col span={16} className={'patient-card-page__happenings'}>
                <PatientHappenings/>
            </Col>
        </Row>
    )
}

export default PatientCard
