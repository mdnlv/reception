import React from "react"
import {Col, DatePicker, Input, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import moment from "moment";
import {useFormikContext} from "formik";
import FormState from "../../../types";


const PersonDisabilities: React.FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section'}>
            <h2>Нетрудоспособность</h2>
            <Row gutter={16}>
                <Col span={10}>
                    <FormField label={'Тип документа'}>
                        <Select/>
                    </FormField>
                </Col>
                <Col span={7}>
                    <FormField label={'Дата начала'}>
                        <DatePicker onChange={form.handleChange} value={moment(form.values.disabilities?.startDate)}/>
                    </FormField>
                </Col>
                <Col span={7}>
                    <FormField label={'Дата окончания'}>
                        <DatePicker onChange={form.handleChange} value={moment(form.values.disabilities?.endDate)}/>
                    </FormField>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={3}>
                    <FormField label={'Серия'}>
                        <Input name={'disabilities.serial'} onChange={form.handleChange} />
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'Номер'}>
                        <Input name={'disabilities.number'} onChange={form.handleChange} />
                    </FormField>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <FormField label={'Причина нетрудоспособности'}>
                        <Select/>
                    </FormField>
                </Col>
            </Row>
        </div>
    )
}

export default PersonDisabilities
