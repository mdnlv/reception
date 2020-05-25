import React, {FC} from 'react'
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Col, DatePicker, Input, Row, Select, TimePicker} from 'antd';
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import FormState from "../../../types";

const SurgerySection: FC = (props) => {

    const form = useFormContext<FormState>()

    return (
        <div className={'form-section'}>
            <DropDownContent title={'Абдоминальная хирургия'}>
                <ArrayField
                    fieldName={'surgery'}
                    renderChild={(key, index) => (
                        <Row key={key} gutter={16}>
                            <Col span={3}>
                                <FormField label={'Дата'}>
                                    <Controller
                                        as={<DatePicker/>}
                                        name={`surgery[${index}].date`}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Время'}>
                                    <Controller
                                        as={<TimePicker/>}
                                        name={`surgery[${index}].time`}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={3}>
                                <FormField label={'Тип согласования'}>
                                    <Controller
                                        as={<Select/>}
                                        name={`surgery[${index}].type`}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={4}>
                                <FormField label={'Отвественный ЛПУ'}>
                                    <Controller
                                        as={<Select/>}
                                        name={`surgery[${index}].lpu`}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={3}>
                                <FormField label={'Контрагент'}>
                                    <Controller
                                        as={<Select/>}
                                        name={`surgery[${index}].agent`}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={3}>
                                <FormField label={'Должность'}>
                                    <Controller
                                        as={<Select/>}
                                        name={`surgery[${index}].position`}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={3}>
                                <FormField label={'ФИО'}>
                                    <Controller
                                        as={<Select/>}
                                        name={`surgery[${index}].fullName`}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={3}>
                                <FormField label={'Примечание'}>
                                    <Controller
                                        as={<Input/>}
                                        name={`surgery[${index}].note`}
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

export default SurgerySection
