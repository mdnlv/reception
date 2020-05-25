import React, {FC} from 'react'
import {Controller, FormContext, useForm} from 'react-hook-form'
import DropDownContent from "../../elements/DropDownContent/DropDownContent";
import ArrayField from "../components/ArrayField/ArrayField";
import {Row, Col, Select, DatePicker, Input} from "antd";
import FormField from "../components/FormField/FormField";

const OutsideHospitalizationForm: FC = (props) => {

    const form = useForm()

    return (
        <FormContext {...form}>
            <form className={'outside-hospitalization-form'}>
                <div className={'form-section'}>
                    <DropDownContent title={'Госпитализация в другие ЛПУ'}>
                        <ArrayField
                            fieldName={''}
                            renderChild={() => (
                                <Row gutter={16}>
                                    <Col>
                                        <FormField label={'№ п/п'}>
                                            <Controller
                                                as={<Select/>}
                                                name={''}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col>
                                        <FormField label={'Наименование ЛПУ'}>
                                            <Controller
                                                as={<Select/>}
                                                name={''}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col>
                                        <FormField label={'Цель госпитализации'}>
                                            <Controller
                                                as={<Select/>}
                                                name={''}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col>
                                        <FormField label={'Дата поступления'}>
                                            <Controller
                                                as={<DatePicker/>}
                                                name={''}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col>
                                        <FormField label={'Дата выбытия'}>
                                            <Controller
                                                as={<DatePicker/>}
                                                name={''}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col>
                                        <FormField label={'МКБ'}>
                                            <Controller
                                                as={<Input/>}
                                                name={''}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col>
                                        <FormField label={'Клинический диагноз'}>
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
            </form>
        </FormContext>
    )
}

export default OutsideHospitalizationForm
