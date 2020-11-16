import React, {FC} from 'react'
import {Col, DatePicker, Input, Row, Select} from 'antd'
import FormField from "../../../../components/FormField/FormField";
import {FormState, TrustedDoc} from "../../../types";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import {useFormikContext} from "formik";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";
import moment from "moment";


const SocialStatusDoc: FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section social-status-doc'}>
            <DropDownContent title={'Документ, подтверждающий соц.статус'}>
                <FormArrayField<TrustedDoc> values={form.values.trustedDoc} name={'trustedDoc'} renderChild={
                    (key, index) => (
                        <div key={key}>
                            <Row gutter={16} align={"bottom"}>
                                <Col span={3}>
                                    <FormField >
                                        <Select/>
                                    </FormField>
                                </Col>
                                <Col span={3}>
                                    <FormField label={'Серия'}>
                                        <Input name={`trustedDoc[${index}].serial`} onChange={form.handleChange}/>
                                    </FormField>
                                </Col>
                                <Col span={3}>
                                    <FormField label={'Номер'}>
                                        <Input name={`trustedDoc[${index}].serial`} onChange={form.handleChange}/>
                                    </FormField>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={3}>
                                    <FormField label={'Дата'}>
                                        <DatePicker value={moment(form.values.trustedDoc[index]?.date)} onChange={(_,date) => {
                                            form.setFieldValue(`trustedDoc[${index}].date`, date)
                                        }} />
                                    </FormField>
                                </Col>
                                <Col span={5}>
                                    <FormField label={'Выдан'}>
                                        <Select/>
                                    </FormField>
                                </Col>
                            </Row>
                        </div>
                    )
                }/>
            </DropDownContent>
        </div>
    )
}

export default SocialStatusDoc
