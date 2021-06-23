import React, {FC} from 'react'
import {Col, DatePicker, Input, Row, Select} from 'antd'
import {useFormikContext} from "formik";
import moment from "moment";

import {FormState} from "../../../types";

import FormField from "../../../../components/FormField/FormField";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";

const SocialStatusDoc: FC = () => {
    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section social-status-doc'}>
            <DropDownContent title={'Документ, подтверждающий соц.статус'}>
                <FormArrayField<any>
                // @ts-ignore
                  values={form.values.trustedDoc}
                  name={'trustedDoc'}
                  renderChild={
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
                                        <Input
                                          name={`trustedDoc[${index}].serial`}
                                          onChange={form.handleChange}
                                        />
                                    </FormField>
                                </Col>
                                <Col span={3}>
                                    <FormField label={'Номер'}>
                                        <Input
                                          name={`trustedDoc[${index}].serial`}
                                          onChange={form.handleChange}
                                        />
                                    </FormField>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={3}>
                                    <FormField label={'Дата'}>
                                        <DatePicker
                                           // @ts-ignore
                                          value={moment(form?.values?.trustedDoc[index]?.date)}
                                          onChange={(_,date) => {
                                            form.setFieldValue(`trustedDoc[${index}].date`, date)
                                          }}
                                        />
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
