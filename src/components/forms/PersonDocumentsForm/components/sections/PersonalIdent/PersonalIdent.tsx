import React, {FC} from 'react'
import {Col, DatePicker, Input, Row, Select} from "antd";
import {useFormikContext} from "formik";
import moment from "moment";

import FormState from "../../../types";

import FormField from "../../../../components/FormField/FormField";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";

const PersonalIdent: FC = () => {
    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section'}>
            <DropDownContent title={'Идентификация'}>
                <FormArrayField values={form.values.idDoc} name={'idDoc'} renderChild={
                    (key, index) => (
                        <Row gutter={16} key={key}>
                            <Col span={4}>
                                <FormField label={'Паспорт'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField label={'Серия'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col span={3}>
                                <FormField label={'Номер'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата начала'}>
                                    <DatePicker
                                      value={moment(form.values.idDoc[index]?.fromDate)}
                                      onChange={(_, date) => {
                                          form.setFieldValue(`namedDoc[${index}].fromDate`, date)
                                      }}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата окончания'}>
                                    <DatePicker
                                      value={moment(form.values.idDoc[index]?.endDate)}
                                      onChange={(_, date) => {
                                          form.setFieldValue(`namedDoc[${index}].endDate`, date)
                                      }}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Кем выдан'}>
                                    <Input name={`namedDoc[${index}].givenBy`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                        </Row>
                    )
                }/>
            </DropDownContent>
        </div>
    )
}

export default PersonalIdent
