import React, {FC} from 'react'
import {Col, DatePicker, Row, Select} from 'antd';
import {useFormikContext} from "formik";
import moment from "moment";

import FormState from "../../../types";

import FormField from "../../../../components/FormField/FormField";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";

const MedIntolerance: FC = () => {
    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section'}>
            <DropDownContent title={'Медикаментозная непереносимость'}>
                <FormArrayField values={form.values.medIntolerance} name={'medIntolerances'} renderChild={
                    (key, index) => (
                        <Row gutter={16} key={key}>
                            <Col>
                                <FormField label={'Наименование вещества'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Степень'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата установления'}>
                                    <DatePicker
                                      value={moment(form.values.medIntolerance[index]?.fromDate)}
                                      onChange={(_,date)=>{
                                          form.setFieldValue(`medIntolerance[${index}].fromDate`, date)
                                      }}
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

export default MedIntolerance
