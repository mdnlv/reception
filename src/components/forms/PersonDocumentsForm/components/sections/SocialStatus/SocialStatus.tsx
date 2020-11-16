import React, {FC} from 'react'
import {Col, DatePicker, Input, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import {useFormikContext} from "formik";
import moment from "moment";
import FormState from "../../../types";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";

const SocialStatus: FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section social-status'}>
            <DropDownContent title={'Социльный статус'}>
                <FormArrayField values={form.values.socialStatus} name={'socialStatus'} renderChild={
                    (key, index) => (
                        <Row gutter={16} key={key}>
                            <Col>
                                <FormField label={'Тип'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Серия'}>
                                    <Input name={`socialStatus[${index}].serial`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Номер'}>
                                    <Input name={`socialStatus[${index}].number`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата начала'}>
                                    <DatePicker value={moment()} onChange={(_, date) => {
                                        form.setFieldValue(`socialStatus[${index}].fromDate`, date)
                                    }}/>>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата оканчания'}>
                                    <DatePicker value={moment()} onChange={(_, date) => {
                                        form.setFieldValue(`socialStatus[${index}].endDate`, date)
                                    }}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Кем выдан'}>
                                    <Input name={`socialStatus[${index}].givenBy`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                        </Row>
                    )
                }/>
            </DropDownContent>
        </div>
    )
}

export default SocialStatus
