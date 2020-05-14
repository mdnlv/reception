import React, {FC} from 'react'
import {Card, Col, Row} from "antd";
import UserGeneralInfo from "../../components/forms/UserGeneralInfo/UserGeneralInfo";
import PassportGeneralPage
    from "../../components/tabs/RegistrationCardTabs/pages/PassportGeneralPage/PassportGeneralPage";
import RegistrationCardTabs from "../../components/tabs/RegistrationCardTabs/RegistrationCardTabs";
import './styles.scss'

const RegistrationCard: FC = (props) => {
    return (
        <Row>
            <Col
                span={4}
            >
                <Card>
                    <UserGeneralInfo/>
                </Card>
            </Col>
            <Col
                span={20}
            >
                <div className="registration-card__forms">
                    <RegistrationCardTabs/>
                </div>
            </Col>
        </Row>
    )
}

export default RegistrationCard
