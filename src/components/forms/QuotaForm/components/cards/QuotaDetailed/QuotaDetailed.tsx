import React, {FC} from 'react'
import {Row, Col, Select, Input, InputNumber, Radio, DatePicker} from 'antd'
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import './styles.scss'

const QuotaDetailed: FC = (props) => {

    const form = useFormContext()

    return (
        <div className={'quota-detailed'}>
            <Row>
                <Col span={12} className={'col--border-right'}>
                    <FormField label={'Идентификатор'} labelPosition={'left'}>
                        <Controller
                            as={<Input/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                    <FormField label={'Этап'} labelPosition={'left'}>
                        <Controller
                            as={<InputNumber/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                    <FormField label={'Номер талона'} labelPosition={'left'}>
                        <Controller
                            as={<Input/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                    <FormField label={'Кол-во'} labelPosition={'left'}>
                        <Controller
                            as={<InputNumber/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                    <FormField label={'Обращение'} labelPosition={'left'}>
                        <Row>
                            <Col span={12}>
                                <Controller
                                    as={<Radio>
                                        первичное
                                    </Radio>}
                                    name={''}
                                    control={form.control}
                                />
                            </Col>
                            <Col span={12}>
                                <Controller
                                    as={<Radio>
                                        вторичное
                                    </Radio>}
                                    name={''}
                                    control={form.control}
                                />
                            </Col>
                        </Row>
                    </FormField>
                    <FormField label={'МКБ'} labelPosition={'left'}>
                        <Controller
                            as={<Select/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                </Col>
                <Col span={12}>
                    <FormField label={'Дата обращения'}>
                        <Controller
                            as={<DatePicker/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                    <FormField label={'ЛПУ направления'} labelPosition={'left'}>
                        <Controller
                            as={<Select/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                    <FormField label={'ЛПУ направления'} labelPosition={'left'}>
                        <Controller
                            as={<Select/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                    <FormField label={'Дата регистрации'} labelPosition={'left'}>
                        <Controller
                            as={<DatePicker/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                    <FormField label={'Дата окончания действия'} labelPosition={'left'}>
                        <Controller
                            as={<DatePicker/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                    <FormField label={'Подразделение'} labelPosition={'left'}>
                        <Controller
                            as={<Select/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <FormField label={'Идентификатор'} labelPosition={'left'}>
                        <Controller
                            as={<Select/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                </Col>
                <Col span={12}>
                    <FormField label={'Идентификатор'} labelPosition={'left'} >
                        <Controller
                            as={<Select/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <FormField label={'Идентификатор'} labelPosition={'left'}>
                        <Controller
                            as={<Select/>}
                            name={''}
                            control={form.control}
                        />
                    </FormField>
                </Col>
            </Row>
        </div>
    )
}

export default QuotaDetailed
