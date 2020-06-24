import React from "react"
import PatientHappeningsHeader from "./components/PatientHappeningsHeader/PatientHappeningsHeader";
import './styles.scss'
import {Col, Row} from "antd";
import PatientHappeningsList from "./components/PatienHappeningsList/PatientHappeningsList";

const listData = [
    {
        id: '1',
        type: 'Осмотр',
        assignDoc: 'Болотов В.К.',
        executedDoc: 'Болотов В.Д',
        state: 'Закончено',
        startDate: new Date()
    },
    {
        id: '2',
        type: 'Осмотр',
        assignDoc: 'Болотов В.К.',
        executedDoc: 'Болотов В.Д',
        state: 'Закончено',
        startDate: new Date()
    }
]

const PatientHappenings: React.FC = (props) => {
    return (
        <div className={'patient-happenings-card'}>
            <div className="patient-happenings-card__header">
                <h3 className={'header-title'}>Случаи</h3>
            </div>
            <div className="patient-happenings-card__content">
                <PatientHappeningsHeader/>

                <Row>
                    <Col span={24}>
                        <PatientHappeningsList data={listData}/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default PatientHappenings
