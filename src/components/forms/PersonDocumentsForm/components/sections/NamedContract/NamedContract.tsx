import React, {FC} from 'react'
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Col, DatePicker, Input, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useForm, useFormContext} from "react-hook-form";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";

const NamedContract: FC = (props) => {

    const form = useFormContext()

    return (
        <div className={'form-section'}>
            <DropDownContent title={'Именной договор'}>
                <ArrayField
                    fieldName={'ide'}
                    renderChild={() => (
                        <Row gutter={16}>
                            <Col>
                                <FormField label={'Отображается с'}>
                                    <Controller
                                        as={<DatePicker/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Отображается по'}>
                                    <Controller
                                        as={<DatePicker/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Тип схемы оплаты'}>
                                    <Controller
                                        as={<Select/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Номер схемы оплаты'}>
                                    <Controller
                                        as={<Select/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Нач. дата'}>
                                    <Controller
                                        as={<DatePicker/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Конеч. дата'}>
                                    <Controller
                                        as={<DatePicker/>}
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

export default NamedContract
