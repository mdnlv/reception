import React, {FC, useEffect} from 'react'
import {Row, Col, Select, Input, InputNumber, Radio, DatePicker} from 'antd'
import {Controller, useFormContext} from "react-hook-form";

import './styles.scss'
import FormState from "../../../types";
import {QuotaProps} from "./types";

import FormField from "../../../../components/FormField/FormField";
import ArrayField from "../../../../components/ArrayField/ArrayField";

const QuotaDetailed: FC<QuotaProps> = ({currentIndex}) => {
    const form = useFormContext<FormState>()
    const appealChange = form.watch('quotas')

    useEffect(() => {
        //console.log(form.getValues({nest: true}))
    }, [appealChange])

    return (
        <div className={'quota-detailed'}>
            <ArrayField<FormState> fieldName={'quotas'} renderChild={
                (key, index) => (
                    <>
                        {
                            index === currentIndex && <>
                                <Row>
                                    <Col span={12} className={'col--border-right'}>
                                        <FormField label={'Идентификатор'} labelPosition={'left'}>
                                            <Controller
                                                as={<Input/>}
                                                name={`quotas[${index}].step`}
                                                control={form.control}
                                            />
                                        </FormField>
                                        <FormField label={'Этап'} labelPosition={'left'}>
                                            <Controller
                                                as={<InputNumber/>}
                                                name={`quotas[${index}].step`}
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
                                                name={`quotas[${index}].num`}
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
                                                name={`quotas[${index}].mkb`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={12}>
                                        <FormField label={'Дата обращения'}>
                                            <Controller
                                                as={<DatePicker/>}
                                                name={`quotas[${index}].date`}
                                                control={form.control}
                                            />
                                        </FormField>
                                        <FormField label={'ЛПУ направления'} labelPosition={'left'}>
                                            <Controller
                                                as={<Select/>}
                                                name={`quotas[${index}].lpu`}
                                                control={form.control}
                                            />
                                        </FormField>
                                        <FormField label={'Дата регистрации'} labelPosition={'left'}>
                                            <Controller
                                                as={<DatePicker/>}
                                                name={`quotas[${index}].date`}
                                                control={form.control}
                                            />
                                        </FormField>
                                        <FormField label={'Дата окончания действия'} labelPosition={'left'}>
                                            <Controller
                                                as={<DatePicker/>}
                                                name={`quotas[${index}].endDate`}
                                                control={form.control}
                                            />
                                        </FormField>
                                        <FormField label={'Подразделение'} labelPosition={'left'}>
                                            <Controller
                                                as={<Select/>}
                                                name={`quotas[${index}].division`}
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
                                        <FormField label={'Прикрепление по квоте'} labelPosition={'left'} >
                                            <Controller
                                                as={<Select/>}
                                                name={``}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <FormField label={'Показания'} labelPosition={'left'}>
                                            <Controller
                                                as={<Select/>}
                                                name={`quotas[${index}].note`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                </Row>
                                </>
                        }
                    </>
                )
            }/>
        </div>
    )
}

export default QuotaDetailed
