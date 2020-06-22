import React from 'react'
import {Checkbox, Col, InputNumber, Row} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {useFormikContext} from "formik";
import {FormState} from "../../../types";

const PersonalData: React.FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section'}>
            <h2>По персональным данным</h2>
            <Row>
               <Col>
                   <FormField label={'Возраст с'}>
                       <InputNumber name={'personalData.ageFrom'} onChange={form.handleChange} />
                   </FormField>
               </Col>
                <Col>
                    <FormField label={'Возраст до'}>
                        <InputNumber name={'personalData.ageTo'} onChange={form.handleChange} />
                    </FormField>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormField label={'Год рождения'}>
                        <InputNumber name={'personalData.birthYear'} onChange={form.handleChange} />
                    </FormField>
                </Col>
                <Col>
                    <FormField label={'Месяц рождения'}>
                        <InputNumber name={'personalData.birthMonth'} onChange={form.handleChange} />
                    </FormField>
                </Col>
                <Col>
                    <FormField label={'не указан адрес'} labelPosition={'right'}>
                        <Checkbox name={'personalData.hasAddress'} onChange={form.handleChange} />
                    </FormField>
                </Col>
            </Row>
        </div>
    )
}

export default PersonalData
