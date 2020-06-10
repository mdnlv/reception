import React, {FC} from 'react'
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Col, DatePicker, Row, Select} from 'antd';
import FormField from "../../../../components/FormField/FormField";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import FormState from "../../../types";
import {useFormikContext} from "formik";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";
import moment from "moment";

const MedIntolerance: FC = (props) => {

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
                                    <DatePicker value={moment(form.values.medIntolerance[index]?.fromDate)} onChange={(_,date)=>{
                                        form.setFieldValue(`medIntolerance[${index}].fromDate`, date)
                                    }} />
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
