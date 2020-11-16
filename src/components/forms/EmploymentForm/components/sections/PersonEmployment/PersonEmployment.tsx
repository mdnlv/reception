import React, {FC} from 'react'
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import {Col, Input, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import FormState from "../../../types";
import {useFormikContext} from "formik";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";

const PersonEmployment: FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section'}>

            <DropDownContent title={'Занятось'}>
                <FormArrayField values={form.values.employments} name={'employements'} renderChild={
                    (key, index) => (
                        <div key={key}>
                            <Row gutter={16}>
                                <Col span={8} className={'col--border-right'} >
                                    <FormField label={'Организация'}>
                                        <Select/>
                                    </FormField>
                                </Col>
                                <Col span={8} className={'col--border-right'}>
                                    <FormField label={'Должность'}>
                                        <Input name={`employments[${index}].position`} onChange={form.handleChange} />
                                    </FormField>
                                    <FormField label={'Стаж'}>
                                        <Input name={`employments[${index}].experience`} onChange={form.handleChange} />
                                    </FormField>
                                </Col>
                                <Col span={8}>
                                    <FormField label={'ИНН'}>
                                        <Input name={`employments[${index}].inn`} onChange={form.handleChange} />
                                    </FormField>
                                    <FormField label={'ОГРН'}>
                                        <Input name={`employments[${index}].ogrn`} onChange={form.handleChange} />
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
