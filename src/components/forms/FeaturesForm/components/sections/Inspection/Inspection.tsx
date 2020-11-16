import React, {FC} from 'react'
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import {Col, DatePicker, Input, Row, Select} from 'antd';
import FormField from "../../../../components/FormField/FormField";
import FormState from "../../../types";
import moment from "moment";
import {useFormikContext} from "formik";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";

const Inspection: FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section person-inspection'}>
            <DropDownContent title={'Обследования'}>
                <FormArrayField values={form.values.inspections} name={'inspections'} renderChild={
                    (key, index) => (
                        <Row gutter={16} key={key}>
                            <Col span={6}>
                                <FormField label={'Класс'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col span={6}>
                                <FormField label={'Тип'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col span={3}>
                                <FormField label={'Дата начала'}>
                                    <DatePicker value={moment(form.values.inspections[index]?.startDate)} onChange={(_, date)=>{
                                        form.setFieldValue(`inspections[${index}].startDate`, date)
                                    }} />
                                </FormField>
                            </Col>
                            <Col span={3}>
                                <FormField label={'Дата окончания'}>
                                    <DatePicker value={moment(form.values.inspections[index]?.endDate)} onChange={(_, date)=>{
                                        form.setFieldValue(`inspections[${index}].endDate`, date)
                                    }} />
                                </FormField>
                            </Col>
                            <Col span={6}>
                                <FormField label={'Примечание'}>
                                    <Input name={`inspections[${index}].note`} onChange={form.handleChange}/>
                                </FormField>
                            </Col>
                        </Row>
                    )
                }/>
            </DropDownContent>
        </div>
    )
}

export default Inspection
