import React, {FC} from 'react'
import {Col, DatePicker, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import {useFormikContext} from "formik";
import FormState from "../../../types";
import moment from "moment";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";

const NamedContract: FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section'}>
            <DropDownContent title={'Именной договор'}>
                <FormArrayField values={form.values.namedDoc} name={'namedDoc'} renderChild={
                    (key, index) => (
                        <Row gutter={16} key={key}>
                            <Col>
                                <FormField label={'Отображается с'}>
                                    <DatePicker value={moment()} onChange={(_, date) => {
                                        form.setFieldValue(`namedDoc[${index}].fromDate`, date)
                                    }}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Отображается по'}>
                                    <DatePicker value={moment()} onChange={(_, date) => {
                                        form.setFieldValue(`namedDoc[${index}].toDate`, date)
                                    }}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Тип схемы оплаты'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Номер схемы оплаты'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Нач. дата'}>
                                    <DatePicker value={moment()} onChange={(_, date) => {
                                        form.setFieldValue(`namedDoc[${index}].startDate`, date)
                                    }}/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Конеч. дата'}>
                                    <DatePicker value={moment()} onChange={(_, date) => {
                                        form.setFieldValue(`namedDoc[${index}].endDate`, date)
                                    }}/>
                                </FormField>
                            </Col>
                        </Row>
                    )
                }/>
            </DropDownContent>
        </div>
    )
}

export default NamedContract
