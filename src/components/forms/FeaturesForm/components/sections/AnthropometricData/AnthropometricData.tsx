import React, {FC} from 'react'
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Row, Col, Select, DatePicker, Input} from 'antd';
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import moment from "moment";

const AnthropometricData: FC = (props) => {

    const {control} = useFormContext()

    return (
        <div className={'form-section'}>
            <DropDownContent title={'Антропометрические данные'}>
                <ArrayField fieldName={'anthropometricData'} renderChild={
                    (key, index) => (
                        <Row gutter={16} key={key} align={'bottom'}>
                            <Col span={3}>
                                <FormField label={'Дата установления'}>
                                    <Controller
                                        as={<DatePicker defaultValue={moment()}/>}
                                        name={`medIntolerances[${index}].name`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Рост, см'}>
                                    <Controller
                                        as={<Input />}
                                        name={`medIntolerances[${index}].name`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Вес, кг'}>
                                    <Controller
                                        as={<Input />}
                                        name={`medIntolerances[${index}].name`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Обхват талии, см'}>
                                    <Controller
                                        as={<Input />}
                                        name={`medIntolerances[${index}].name`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Обхват груди, см'}>
                                    <Controller
                                        as={<Input />}
                                        name={`medIntolerances[${index}].name`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Индекс массы тела'}>
                                    <Controller
                                        as={<Input />}
                                        name={`medIntolerances[${index}].name`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Телосложение'}>
                                    <Controller
                                        as={<Input />}
                                        name={`medIntolerances[${index}].name`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={7}>
                                <FormField label={'Суточный объем физиологических отправлений, мл'}>
                                    <Controller
                                        as={<Input />}
                                        name={`medIntolerances[${index}].name`}
                                        control={control}
                                    />
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
