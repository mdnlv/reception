import React, {FC} from 'react'
import {Card, Col, Row} from "antd";
import UserGeneralInfo from "../../components/forms/UserGeneralInfo/UserGeneralInfo";
import RegistrationCardTabs from "../../components/tabs/RegistrationCardTabs/RegistrationCardTabs";
import './styles.scss'

const RegistrationCard: FC = (props) => {
    return (
        <Row>
            <Col
                span={5}
            >
                <Card>
                    <UserGeneralInfo/>
                </Card>
            </Col>
            <Col
                span={19}
            >
                <div className="registration-card__forms">
                    <RegistrationCardTabs/>
                </div>
            </Col>
        </Row>
    )
}

export default RegistrationCard
