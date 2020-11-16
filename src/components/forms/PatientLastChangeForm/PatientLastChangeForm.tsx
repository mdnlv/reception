import React from 'react'
import {Formik} from "formik";
import {Col, DatePicker, Divider, Input, Row} from "antd";
import FormField from "../components/FormField/FormField";

const PatientLastChangeForm: React.FC = (props) => {
    return (
        <Formik
            initialValues={{}}
            onSubmit={() => {}}
        >
            {formProps => (
                <form className={'appointment-form'}>
                    <Row gutter={16}>
                        <Col>
                            <FormField label={'Дата последнего изменения'}>
                                <DatePicker/>
                            </FormField>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={24}>
                            <FormField label={'ФИО вносившего последние изменения'}>
                                <Input/>
                            </FormField>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={24}>
                            <FormField label={'Название поля, в котором произошли изменения'}>
                                <Input disabled/>
                            </FormField>
                        </Col>
                    </Row>
                </form>
            )}
        </Formik>
    )
}

export default PatientLastChangeForm
