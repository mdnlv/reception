import React, {FC, useEffect} from 'react'
import {Col, DatePicker, Input, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import FormState from "../../../types";
import {useFormikContext} from "formik";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";
import moment from "moment";



const PersonAllergy: FC = (props) => {

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
                                    <DatePicker value={moment(form.values.allergy[index]?.fromDate)} onChange={form.handleChange} />
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
