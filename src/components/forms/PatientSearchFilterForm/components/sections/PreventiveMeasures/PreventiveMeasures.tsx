import React from 'react'
import {Checkbox, Col, DatePicker, Input, InputNumber, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";

const PreventiveMeasures: React.FC = (props) => {
    return (
        <div className={'form-section'}>
            <h2>В списке профилактических мероприятий</h2>
            <Row>
                <Col span={24}>
                    <FormField label={'Тип'}>
                        <Select/>
                    </FormField>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormField label={'Год'}>
                        <InputNumber>Год</InputNumber>
                    </FormField>
                </Col>
                <Col>
                    <FormField label={'Квартал'}>
                        <InputNumber>Квартал</InputNumber>
                    </FormField>
                </Col>
            </Row>
        </div>
    )
}

export default PreventiveMeasures
