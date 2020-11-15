import React, {FC} from 'react'
import {Row, Col, Select, DatePicker, Input, Checkbox} from "antd";
import {useFormikContext} from "formik";
import moment from "moment";

import FormState from "../../../types";

import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import FormField from "../../../../components/FormField/FormField";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";

const PersonInvalidity: FC = () => {
    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section'}>
            <DropDownContent title={'Инвалидность'}>
                <FormArrayField values={form.values.invalidity} name={'invalidity'} renderChild={
                    (key, index) => (
                        <Row key={key} gutter={16}>
                            <Col>
                               <FormField label={'Сомат'}>
                                   <Checkbox
                                     name={`invalidity[${index}].isSomat`}
                                     onChange={form.handleChange}
                                   />
                               </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата установления'}>
                                    <DatePicker
                                      value={moment(form.values.invalidity[index]?.fromDate)}
                                      onChange={(_,date) => {
                                        form.setFieldValue('invalidity[${index}].fromDate', date)
                                      }}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Бессрочно'}>
                                    <Checkbox
                                      name={`invalidity[${index}].unlimited`}
                                      onChange={form.handleChange}
                                    />
                                </FormField>
                            </Col>
                            <Col span={3}>
                                <FormField label={'Группа'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Очередное переосв.'}>
                                    <DatePicker
                                      value={moment(form.values.invalidity[index]?.nextDate)}
                                      onChange={(_, date) => {
                                          form.setFieldValue(`invalidity[${index}].nextDate`, date)
                                      }}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Место работы'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Степень утраты трудосп.'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Перв.'}>
                                    <Checkbox
                                      name={`invalidity[${index}].firstly`}
                                      onChange={form.handleChange}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Стационар'}>
                                    <Checkbox
                                      name={`invalidity[${index}].isHospital`}
                                      onChange={form.handleChange}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Примечание'}>
                                    <Input
                                      name={`invalidity[${index}].note`}
                                      onChange={form.handleChange}
                                    />
                                </FormField>
                            </Col>
                        </Row>
                    )
                }/>
            </DropDownContent>
        </div>
    )
}

export default PersonInvalidity
