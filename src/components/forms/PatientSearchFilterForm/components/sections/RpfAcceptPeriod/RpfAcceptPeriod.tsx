import React from 'react'
import {Button, Checkbox, Col, DatePicker, Input, Row} from "antd";
import FormField from "../../../../components/FormField/FormField";

const RpfAcceptPeriod: React.FC = (props) => {
    return (
        <div className={'form-section'}>
            <h2>Период подтверждения РПФ</h2>
            <Row>
                <Col span={24}>
                    <FormField>
                        <DatePicker size={'small'}/>
                    </FormField>
                </Col>
            </Row>
            <Row justify={'space-between'}>
                <Col>
                    <FormField>
                        <Checkbox>неподтвержденные РПФ</Checkbox>
                    </FormField>
                </Col>
            </Row>
            <Row justify={'space-between'}>
                <Col>
                    <FormField>
                        <Checkbox>онкологическая форма 90</Checkbox>
                    </FormField>
                </Col>
            </Row>
        </div>
    )
}

export default RpfAcceptPeriod
