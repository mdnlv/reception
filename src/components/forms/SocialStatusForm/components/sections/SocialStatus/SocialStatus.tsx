import React, {FC} from 'react'
import {Col, Input, Row, Select, DatePicker, Divider} from "antd";
import {useFormikContext} from "formik";
import moment from "moment";

import {FormState, SocialStatus as SocialStatusType} from "../../../types";

import FormField from "../../../../components/FormField/FormField";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";

const SocialStatus: FC = () => {
    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section social-status'}>
            <DropDownContent title={'Соц.статус'}>
                <FormArrayField<SocialStatusType>
                  values={form.values.socialStatus}
                  name={'socialStatus'}
                  renderChild={
                    (key, index) => (
                        <div key={key}>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <FormField label='Класс'>
                                        <div className='center-wrapper'>
                                            <Select />
                                        </div>
                                    </FormField>
                                </Col>
                                <Col span={6}>
                                    <FormField label='Тип'>
                                        <Select/>
                                    </FormField>
                                </Col>
                                <Col span={3}>
                                    <FormField label='Дата начала'>
                                        <DatePicker value={moment(form.values.socialStatus[index]?.fromDate)} onChange={(_, date) => {
                                            form.setFieldValue(`socialStatus[${index}].fromDate`, date)
                                        }}/>
                                    </FormField>
                                </Col>
                                <Col span={3}>
                                    <FormField label='Дата окончания'>
                                        <DatePicker value={moment(form.values.socialStatus[index]?.endDate)} onChange={(_, date) => {
                                            form.setFieldValue(`socialStatus[${index}].endDate`, date)
                                        }}/>
                                    </FormField>
                                </Col>
                                <Col span={6}>
                                    <FormField label='Примечания'>
                                        <Input name={`socialStatus[${index}].note`} onChange={form.handleChange} />
                                    </FormField>
                                </Col>
                            </Row>
                            <Divider/>
                        </div>
                        )
                  }/>
            </DropDownContent>
        </div>
    )
}

export default SocialStatus
