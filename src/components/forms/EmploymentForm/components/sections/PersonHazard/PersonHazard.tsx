import React, {FC} from 'react'
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import {Col, Input, Row, InputNumber, Select, Divider} from "antd";
import {Controller, useForm, useFormContext} from "react-hook-form";
import FormField from "../../../../components/FormField/FormField";
import FormState from "../../../types";
import ArrayField from "../../../../components/ArrayField/ArrayField";

const PersonHazard: FC = (props) => {

    const {control} = useFormContext<FormState>()

    return (
        <div className={'form-section person-hazard'}>
            <DropDownContent title={'Вредность'}>
                <ArrayField fieldName={'hazardHistory'} renderChild={
                    (key: string, index) => (
                       <Row gutter={16} key={key}>
                           <Col span={16}>
                               <FormField label={'Вредность'}>
                                   <Controller name={`hazardHistory[${index}].description`} as={<Select/>} control={control}/>
                               </FormField>
                           </Col>
                           <Col span={4}>
                               <FormField label={'Стаж'}>
                                   <Controller name={`hazardHistory[${index}].exp`} as={<InputNumber/>} control={control}/>
                               </FormField>
                           </Col>
                       </Row>
                    )
                }/>
                <Divider/>
                <Row>
                    <Col span={12}>
                        <FormField label={'Фактор'}>
                            <Controller name={`employements`} as={<Select/>} control={control}/>
                        </FormField>
                    </Col>
                </Row>
                <Divider/>
                <Row gutter={16} align={'bottom'}>
                    <Col span={8}>
                        <FormField label={'Адрес'}>
                            <Controller name={`employements`} as={<Select/>} control={control}/>
                        </FormField>
                    </Col>
                    <Col span={8}>
                        <FormField label={'Адрес'}>
                            <Controller name={`employements`} as={<Select/>} control={control}/>
                        </FormField>
                    </Col>
                    <Col>
                        <FormField label={'Стаж'}>
                            <Controller name={`employements`} as={<InputNumber/>} control={control}/>
                        </FormField>
                    </Col>
                </Row>
            </DropDownContent>
        </div>
    )
}

export default PersonHazard
