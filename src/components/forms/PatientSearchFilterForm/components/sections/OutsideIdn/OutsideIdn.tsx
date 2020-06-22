import React from 'react'
import {Button, Checkbox, Col, DatePicker, Input, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";

const OutsideIdn: React.FC = (props) => {
    return (
        <div className={'form-section'}>
            <h2>По внешнему идентификатору</h2>
            <Row>
                <Col span={24}>
                    <FormField label={'Тип'}>
                        <Select/>
                    </FormField>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormField label={'Идентификатор'}>
                        <Input/>
                    </FormField>
                </Col>
            </Row>
        </div>
    )
}

export default OutsideIdn
