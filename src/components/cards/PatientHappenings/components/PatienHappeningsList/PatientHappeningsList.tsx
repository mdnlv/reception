import React from 'react'
import PatientHappening from "../../../../../types/data/PatientHappening";
import {Col, Descriptions, Row} from "antd";
import './styles.scss'

type ListProps = {
    data: PatientHappening[]
}

const PatientHappeningsList: React.FC<ListProps> = (props) => {

    const renderBodyList = () => {
        return props.data.map(item => {
            return (
                <div className={'happenings-list__item'}>
                    <Row align={'stretch'}>
                        <Col span={4} className={'happenings-list__item-title col--border-right'}>
                            <h2>{item.type}</h2>
                        </Col>
                        <Col span={20}>
                            <Row className={'happenings-list__item-info'}>
                                <Col span={18}>
                                    <Descriptions size={'small'} column={5}>
                                        <Descriptions.Item label="назначено">{item.executedDoc}</Descriptions.Item>
                                        <Descriptions.Item label="тип">{item.type}</Descriptions.Item>
                                        <Descriptions.Item label="состояние">{item.state}</Descriptions.Item>
                                        <Descriptions.Item label="назначил">{item.assignDoc}</Descriptions.Item>
                                        <Descriptions.Item label="выполнил">{item.executedDoc}</Descriptions.Item>
                                    </Descriptions>
                                </Col>
                                <Col>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        })
    }

    return (
        <div>
            {renderBodyList()}
        </div>
    )
}

export default PatientHappeningsList
