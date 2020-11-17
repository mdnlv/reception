import React, {FC} from 'react';
import {Col, Row, Select, DatePicker} from 'antd';
import {Formik} from "formik";
import moment from "moment";

import DropDownContent from "../../elements/DropDownContent/DropDownContent";
import FormField from "../components/FormField/FormField";
import FormArrayField from "../components/FormArrayField/FormArrayField";

const PersonViewTypeForm: FC = () => {
    return (
        <Formik
            initialValues={{}}
            onSubmit={() => {}}
        >
            {formProps => (
                <form className={'person-view-type-form'}>
                    <div className="form-section">
                        <DropDownContent title={'Вид наблюдения'}>
                            <FormArrayField values={[]} name={'viewTypes'} renderChild={
                                (key, index) => (
                                    <Row gutter={16} key={key}>
                                        <Col span={4}>
                                            <FormField label={'Тип'}>
                                                <Select/>
                                            </FormField>
                                        </Col>
                                        <Col span={6}>
                                            <FormField label={'ЛПУ'}>
                                                <Select/>
                                            </FormField>
                                        </Col>
                                        <Col span={3}>
                                            <FormField label={'Дата прикрепления'}>
                                                <DatePicker value={moment()} onChange={(_, date) => {
                                                    formProps.setFieldValue('fromDate', date)
                                                }}/>
                                            </FormField>
                                        </Col>
                                        <Col span={3}>
                                            <FormField label={'Дата открепления'}>
                                                <DatePicker value={moment()} onChange={(_, date) => {
                                                    formProps.setFieldValue('endDate', date)
                                                }}/>
                                            </FormField>
                                        </Col>
                                        <Col span={7}>
                                            <FormField label={'Причина открепления'}>
                                                <Select/>
                                            </FormField>
                                        </Col>
                                    </Row>
                                )
                            }/>
                        </DropDownContent>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default PersonViewTypeForm
