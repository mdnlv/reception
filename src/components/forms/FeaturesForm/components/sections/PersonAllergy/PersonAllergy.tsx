import React, {FC} from 'react'
import {Col, DatePicker, Row, Select} from "antd";
import {useFormikContext} from "formik";

import moment from "moment";

import FormState from "../../../types";

import FormField from "../../../../components/FormField/FormField";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";

const PersonAllergy: FC = () => {
    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section person-allergy'}>
            <DropDownContent title={'Аллергия'}>
                <FormArrayField values={form.values.allergy} name={'allergy'} renderChild={
                    (key, index) => (
                        <Row gutter={16}>
                            <Col span={5}>
                                <FormField label={'Наименование вещества'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col span={5}>
                                <FormField label={'Степень'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col span={5}>
                                <FormField label={'Дата установления'}>
                                    <DatePicker
                                      value={moment(form.values.allergy[index]?.fromDate)}
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

export default PersonAllergy
