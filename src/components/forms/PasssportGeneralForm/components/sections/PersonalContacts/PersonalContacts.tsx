import React, {FC, useEffect} from 'react'
import {Col, Input, Radio, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {FieldArray, useFormikContext} from "formik";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";
import FormState, {PassportContactType} from "../../../types";


const PersonalContacts: FC = (props) => {

    const form = useFormikContext<FormState>()


    return (
        <div className={'form-section personal-contacts'}>
            <h2>Контакты</h2>
            <FormArrayField<PassportContactType> values={form.values.contacts} name={'contacts'} renderChild={
                (key, index) => (
                    <Row gutter={16} key={index.toString()}>
                        <Col span={3}>
                            <FormField label='Основной'>
                                <div className='center-wrapper'>
                                    <Radio name={`contacts[${index}].isMain`} value={form.values.contacts[index]?.isMain || ""} onChange={form.handleChange} />
                                </div>
                            </FormField>
                        </Col>
                        <Col span={6}>
                            <FormField label='Номер'>
                                <Input name={`contacts[${index}].number`} value={form.values.contacts[index]?.number || ""} onChange={form.handleChange}/>
                            </FormField>
                        </Col>
                        <Col span={5}>
                            <FormField label='Тип'>
                                <Select/>
                            </FormField>
                        </Col>
                        <Col span={10}>
                            <FormField label='Примечания'>
                                <Input name={`contacts[${index}].note`} value={form.values.contacts[index]?.note || ""} onChange={form.handleChange}/>
                            </FormField>
                        </Col>
                    </Row>
                )
            }/>
        </div>
    )
}

export default PersonalContacts
