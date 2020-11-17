import React, {FC} from 'react'
import {Col, Row, InputNumber, Select, Divider} from "antd";
import {useFormikContext} from "formik";

import FormState from "../../../types";

import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import FormField from "../../../../components/FormField/FormField";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";

const PersonHazard: FC = () => {
    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section person-hazard'}>
            <DropDownContent title={'Вредность'}>
                <FormArrayField values={form.values.hazardHistory} name={'hazardHistory'} renderChild={
                    (key: string, index) => (
                       <Row gutter={16} key={key}>
                           <Col span={16}>
                               <FormField label={'Вредность'}>
                                   <Select/>
                               </FormField>
                           </Col>
                           <Col span={4}>
                               <FormField label={'Стаж'}>
                                   <InputNumber name={`hazardHistory[${index}].exp`} onChange={form.handleChange} />
                               </FormField>
                           </Col>
                       </Row>
                    )
                }/>
                <Divider/>
                <Row>
                    <Col span={12}>
                        <FormField label={'Фактор'}>
                            <Select/>
                        </FormField>
                    </Col>
                </Row>
                <Divider/>
                <Row gutter={16} align={'bottom'}>
                    <Col span={8}>
                        <FormField label={'Организация'}>
                            <Select/>
                        </FormField>
                    </Col>
                    <Col span={8}>
                        <FormField label={'Должность'}>
                            <Select/>
                        </FormField>
                    </Col>
                    <Col>
                        <FormField label={'Стаж'}>
                            <InputNumber name={'hazard.exp'} onChange={form.handleChange}/>
                        </FormField>
                    </Col>
                </Row>
            </DropDownContent>
        </div>
    )
}

export default PersonHazard
