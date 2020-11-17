import React, {FC} from 'react'
import {Row, Col, DatePicker, Input} from 'antd';
import moment from "moment";
import {useFormikContext} from "formik";

import FormState from "../../../types";

import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import FormField from "../../../../components/FormField/FormField";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";

const AnthropometricData: FC = () => {
    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section'}>
            <DropDownContent title={'Антропометрические данные'}>
                <FormArrayField values={form.values.anthropometricDate}  name={'anthropometricData'} renderChild={
                    (key, index) => (
                        <Row gutter={16} key={key} align={'bottom'}>
                            <Col span={3}>
                                <FormField label={'Дата установления'}>
                                    <DatePicker onChange={form.handleChange} value={moment(form.values.anthropometricDate[index]?.setDate)}/>
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Рост, см'}>
                                    <Input name={`medIntolerance[${index}].height`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Вес, кг'}>
                                    <Input name={`medIntolerance[${index}].weight`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Обхват талии, см'}>
                                    <Input name={`medIntolerance[${index}].waistGirth`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Обхват груди, см'}>
                                    <Input name={`medIntolerance[${index}].chestGirth`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Индекс массы тела'}>
                                    <Input name={`medIntolerance[${index}].waistGirth`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Телосложение'}>
                                    <Input name={`medIntolerance[${index}].bodyType`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col span={7}>
                                <FormField label={'Суточный объем физиологических отправлений, мл'}>
                                    <Input name={`medIntolerance[${index}].dailySendVolume`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                        </Row>
                    )
                }/>
            </DropDownContent>
        </div>
    )
}

export default AnthropometricData
