import React, {FC} from 'react'
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Col, DatePicker, Input, InputNumber, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import {useFormikContext} from "formik";
import FormState from "../../../types";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";
import moment from "moment";

const PersonPolicy: FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section person-policy'}>
            <DropDownContent title={'Полис'}>
                <FormArrayField values={form.values.policy} name={'policy'} renderChild={
                    (key, index) => (
                        <Row gutter={16} key={key}>
                            <Col>
                                <FormField label={'Тип'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Тип'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Номер'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Серия'}>
                                    <Input name={`policy[${index}].serial`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Номер'}>
                                    <Input name={`policy[${index}].number`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата начала'}>
                                    <DatePicker value={moment(form.values.policy[index]?.fromDate)} onChange={(_, date) => {
                                        form.setFieldValue(`policy[${index}].fromDate`, date)
                                    } }/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата окончания'}>
                                    <DatePicker value={moment(form.values.policy[index]?.endDate)} onChange={(_, date) => {
                                        form.setFieldValue(`policy[${index}].endDate`, date)
                                    } }/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'СМО'}>
                                    <Input name={`policy[${index}].CMO`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Наименование'}>
                                    <Input name={`policy[${index}].name`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Примечание'}>
                                    <Input name={`policy[${index}].note`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Искать'}>
                                    <InputNumber name={`policy[${index}].find`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Привязано обращений'}>
                                    <Input name={`policy[${index}].acceptedOffers`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                        </Row>
                    )
                }/>
            </DropDownContent>
        </div>
    )
}

export default PersonPolicy
