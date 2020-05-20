import React, {FC} from 'react'
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Row, Col, Radio, Select, DatePicker, Input} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import FormState from "../../../types";

const PersonInvalidity: FC = (props) => {

    const {control} = useFormContext<FormState>()

    return (
        <div className={'form-section'}>
            <DropDownContent title={'Инвалидность'}>
                <ArrayField fieldName={'invalidity'} renderChild={
                    (key, index) => (
                        <Row key={key} gutter={16}>
                            <Col>
                               <FormField label={'Сомат'}>
                                   <Controller name={''} as={<Radio/>}/>
                               </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата установления'}>
                                    <Controller name={''} as={<DatePicker/>}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Бессрочно'}>
                                    <Controller name={''} as={<Radio/>}/>
                                </FormField>
                            </Col>
                            <Col span={3}>
                                <FormField label={'Группа'}>
                                    <Controller name={''} as={<Select/>}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Очередное переосв.'}>
                                    <Controller name={''} as={<DatePicker/>}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Место работы'}>
                                    <Controller name={''} as={<Select/>}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Степень утраты трудосп.'}>
                                    <Controller name={''} as={<Select/>}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Перв.'}>
                                    <Controller name={''} as={<Radio/>}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Стационар'}>
                                    <Controller name={''} as={<Radio/>}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Примечание'}>
                                    <Controller name={''} as={<Input/>}/>
                                </FormField>
                            </Col>
                        </Row>
                    )
                }/>
            </DropDownContent>
        </div>
    )
}

export default PersonInvalidity
