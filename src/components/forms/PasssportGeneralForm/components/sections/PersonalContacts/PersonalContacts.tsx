import React, {FC, useEffect} from 'react'
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import {Space, Button, Tooltip, Row, Col, Radio, Input, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import ArrayField from "../../../../components/ArrayField/ArrayField";
import FormState from "../../../types";

const PersonalContacts: FC = (props) => {

    const {control} = useFormContext<FormState>()

    return (
        <div className={'form-section personal-contacts'}>
            <h2>Контакты</h2>
            <ArrayField fieldName={'contacts'} renderChild={
                (key, index) => (
                    <Row gutter={16} key={key}>
                        <Col span={3}>
                            <FormField label='Основной'>
                                <div className='center-wrapper'>
                                    <Controller name={`contacts[${index}].isMain`} as={<Radio/>} control={control}/>
                                </div>
                            </FormField>
                        </Col>
                        <Col span={6}>
                            <FormField label='Номер'>
                                <Controller name={`contacts[${index}].number`} as={<Input/>} control={control}/>
                            </FormField>
                        </Col>
                        <Col span={5}>
                            <FormField label='Тип'>
                                <Controller name={`contacts[${index}].type`} as={<Select/>} control={control}/>
                            </FormField>
                        </Col>
                        <Col span={10}>
                            <FormField label='Примечания'>
                                <Controller name={`contacts[${index}].note`} as={<Input/>} control={control}/>
                            </FormField>
                        </Col>
                    </Row>
                )
            }/>
        </div>
    )
}

export default PersonalContacts
