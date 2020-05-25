import React, {FC} from 'react'
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Col, DatePicker, Input, InputNumber, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";

const PersonPolicy: FC = (props) => {

    const form = useFormContext()

    return (
        <div className={'form-section person-policy'}>
            <DropDownContent title={'Полис'}>
                <ArrayField
                    fieldName={'ide'}
                    renderChild={() => (
                        <Row gutter={16}>
                            <Col>
                                <FormField label={'Тип'}>
                                    <Controller
                                        as={<Select/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Тип'}>
                                    <Controller
                                        as={<Select/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Номер'}>
                                    <Controller
                                        as={<Select/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Серия'}>
                                    <Controller
                                        as={<Input/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Номер'}>
                                    <Controller
                                        as={<Input/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата начала'}>
                                    <Controller
                                        as={<DatePicker/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата окончания'}>
                                    <Controller
                                        as={<DatePicker/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'СМО'}>
                                    <Controller
                                        as={<Input/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Наименование'}>
                                    <Controller
                                        as={<Input/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Примечание'}>
                                    <Controller
                                        as={<Input/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Искать'}>
                                    <Controller
                                        as={<InputNumber/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Привязано обращений'}>
                                    <Controller
                                        as={<Input/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                        </Row>
                    )}/>
            </DropDownContent>
        </div>
    )
}

export default PersonPolicy
