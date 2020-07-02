import React from "react"
import {Col, DatePicker, Input} from "antd";
import FormField from "../../../../components/FormField/FormField";
import moment from "moment";
import {useFormikContext} from "formik";
import FormState from "../../../types";
import {Row, Select} from "antd";


const PersonDisabilities: React.FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section'}>
            <h2>Нетрудоспособность</h2>
            <Row gutter={16}>
                <Col span={14}>
                    <FormField label={'Тип документа'}>
                        <Select size={'small'}/>
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'Дата начала'}>
                        <DatePicker size={'small'} onChange={form.handleChange} value={moment(form.values.disabilities?.startDate)}/>
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'Дата окончания'}>
                        <DatePicker size={'small'} onChange={form.handleChange} value={moment(form.values.disabilities?.endDate)}/>
                    </FormField>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={3}>
                    <FormField label={'Серия'}>
                        <Input size={'small'} name={'disabilities.serial'} onChange={form.handleChange} />
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'Номер'}>
                        <Input size={'small'} name={'disabilities.number'} onChange={form.handleChange} />
                    </FormField>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <FormField label={'Причина нетрудоспособности'}>
                        <Select size={'small'}/>
                    </FormField>
                </Col>
            </Row>
        </div>
    )
}

export default PersonDisabilities
