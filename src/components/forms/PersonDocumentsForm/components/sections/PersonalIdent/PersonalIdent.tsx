import React, {FC} from 'react'
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Col, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";


const PersonalIdent: FC = (props) => {

    const form = useFormContext()

    return (
        <div className={'form-section'}>
            <DropDownContent title={'Идентификация'}>
                <ArrayField
                    fieldName={'ide'}
                    renderChild={() => (
                        <Row gutter={16}>
                            <Col>
                                <FormField label={'Паспорт'}>
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
                                <FormField label={'Дата начала'}>
                                    <Controller
                                        as={<Select/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата окончания'}>
                                    <Controller
                                        as={<Select/>}
                                        name={''}
                                        control={form.control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Кем выдан'}>
                                    <Controller
                                        as={<Select/>}
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

export default PersonalIdent
