import React from 'react'
import {Checkbox, Col, DatePicker, Input, InputNumber, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";

const PreventiveMeasures: React.FC = (props) => {
    return (
        <div className={'form-section'}>
            <h2>В списке профилактических мероприятий</h2>
            <Row>
                <Col span={14}>
                    <FormField label={'Тип'}>
                        <Select size={'small'}/>
                    </FormField>
                </Col>
            </Row>
            <Row gutter={8}>
                <Col>
                    <FormField label={'Год'}>
                        <InputNumber size={'small'}>Год</InputNumber>
                    </FormField>
                </Col>
                <Col>
                    <FormField label={'Квартал'}>
                        <InputNumber size={'small'}>Квартал</InputNumber>
                    </FormField>
                </Col>
            </Row>
        </div>
    )
}

export default PreventiveMeasures
