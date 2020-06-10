import React, {FC} from 'react'
import {Col, Row, Select, Input, Space, DatePicker} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import FormState from "../../../types";
import {FormikProps, useFormikContext} from "formik";
import moment from "moment";


const PersonalDocument: FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className='form-section personal-document'>
            <h2>Документ</h2>
            <Row gutter={16}>
                <Col span={5}>
                   <FormField
                       label='Паспорт'
                   >
                       <Select/>
                   </FormField>
                </Col>
                <Col span={5}>
                    <FormField
                        label='Серия'
                    >
                        <Input name={"passportInfo.serial"} value={form.values.passportInfo.serial} onChange={form.handleChange}/>
                    </FormField>
                </Col>
                <Col span={4}>
                    <FormField
                        label='Номер'
                    >
                        <Input name={"passportInfo.number"} value={form.values.passportInfo.number} onChange={form.handleChange}/>
                    </FormField>
                </Col>
                <Col span={4}>
                    <FormField
                        label='Дата выдачи'
                    >
                        <DatePicker value={moment(form.values.passportInfo.fromDate)} onChange={(date, dateString) => {
                            form.setFieldValue('passportInfo.fromDate', dateString)
                        }}/>
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField
                        label='Кем выдан'
                    >
                        <Input name={'passportInfo.givenBy'} value={form.values.passportInfo.givenBy} onChange={form.handleChange}/>
                    </FormField>
                </Col>
            </Row>
        </div>
    )
}

export default PersonalDocument
