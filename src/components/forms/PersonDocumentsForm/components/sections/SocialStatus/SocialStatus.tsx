import React, {FC} from 'react'
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Col, DatePicker, Input, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";

const SocialStatus: FC = (props) => {

    const form = useFormContext()

    return (
        <div className={'form-section social-status'}>
            <DropDownContent title={'Социльный статус'}>
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
                                <FormField label={'Дата оканчания'}>
                                    <Controller
                                        as={<DatePicker/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Кем выдан'}>
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

export default SocialStatus
