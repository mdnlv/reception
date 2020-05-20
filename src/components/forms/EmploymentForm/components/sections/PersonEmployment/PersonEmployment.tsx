import React, {FC, useEffect} from 'react'
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import {Button, Col, Divider, Input, InputNumber, Radio, Row, Select, Space, Tooltip} from "antd";
import {Controller, useFieldArray, useForm, useFormContext} from "react-hook-form";
import FormField from "../../../../components/FormField/FormField";
import ArrayField from "../../../../components/ArrayField/ArrayField";
import FormState from "../../../types";

const PersonEmployment: FC = (props) => {

    const {control} = useFormContext<FormState>()

    return (
        <div className={'form-section'}>

            <DropDownContent title={'Занятось'}>
                <ArrayField fieldName={'employements'} renderChild={
                    (key, index) => (
                        <div key={key}>
                            <Row gutter={16}>
                                <Col span={8} className={'col--border-right'} >
                                    <FormField label={'Организация'}>
                                        <Controller name={`employements[${index}]`} as={<Select/>} control={control}/>
                                    </FormField>
                                </Col>
                                <Col span={8} className={'col--border-right'}>
                                    <FormField label={'Должность'}>
                                        <Controller name={`employements[${index}]`} as={<Input/>} control={control}/>
                                    </FormField>
                                    <FormField label={'Стаж'}>
                                        <Controller name={`employements[${index}]`} as={<InputNumber/>} control={control}/>
                                    </FormField>
                                </Col>
                                <Col span={8}>
                                    <FormField label={'ИНН'}>
                                        <Controller name={`employements[${index}]`} as={<Input/>} control={control}/>
                                    </FormField>
                                    <FormField label={'ОГРН'}>
                                        <Controller name={`employements[${index}]`} as={<Input/>} control={control}/>
                                    </FormField>
                                </Col>
                            </Row>
                        </div >
                    )
                }/>
            </DropDownContent>
        </div>
    )
}

export default PersonEmployment
