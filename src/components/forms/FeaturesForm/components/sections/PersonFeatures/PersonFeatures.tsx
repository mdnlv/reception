import React, {FC} from 'react'
import {Col, Input, InputNumber, Row, Select} from "antd";
import {useFormikContext} from "formik";

import FormState from "../../../types";

import FormField from "../../../../components/FormField/FormField";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";

const PersonFeatures: FC = () => {
    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section'}>
            <DropDownContent title={'Особенности'}>
                <FormArrayField values={form.values.features} name={'features'} renderChild={
                    (key, index) => (
                        <div>
                            <Row>
                                <Col span={4}>
                                    <FormField label={'Группа крови'}>
                                        <Select/>
                                    </FormField>
                                </Col>
                                <Col offset={2} span={7}>
                                    <FormField label={'Примечание'}>
                                        <Input
                                          name={`form.values.features[${index}].note`}
                                          onChange={form.handleChange}
                                        />
                                    </FormField>
                                </Col>
                            </Row>
                            <Row gutter={16} align={'bottom'}>
                                <Col>
                                    <FormField label={'Диагноз'}>
                                        <Input
                                          name={`form.values.features[${index}].diagnose`}
                                          onChange={form.handleChange}
                                        />
                                    </FormField>
                                </Col>
                                <Col>
                                    <FormField
                                      labelPosition={'left'} label={'Рост при рождении'}>
                                        <InputNumber
                                          name={`form.values.features[${index}].birthHeight`}
                                          onChange={form.handleChange}
                                        />
                                    </FormField>
                                </Col>
                                <Col>
                                    <FormField labelPosition={'left'} label={'Вес при рождении'}>
                                        <InputNumber
                                          name={`form.values.features[${index}].birthWeight`}
                                          onChange={form.handleChange}
                                        />
                                    </FormField>
                                </Col>
                                <Col>
                                    <FormField labelPosition={'left'} label={'Неделя эмбрионального периода'}>
                                        <InputNumber
                                          name={`form.values.features[${index}].weekEmbryonic`}
                                          onChange={form.handleChange}
                                        />
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

export default PersonFeatures
