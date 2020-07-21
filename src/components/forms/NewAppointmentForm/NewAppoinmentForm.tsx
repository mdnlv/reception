import React from 'react'
import {Formik} from "formik";
import {Col, DatePicker, Divider, Input, Row, Select, TimePicker} from "antd";
import FormField from "../components/FormField/FormField";


const NewAppointmentForm: React.FC = (props) => {
    return (
        <Formik
            initialValues={{}}
            onSubmit={() => {}}
        >
            {formProps => (
                <form className={'appointment-form'}>
                    <Row gutter={16}>
                        <Col>
                            <FormField label={'Дата приема'}>
                                <DatePicker/>
                            </FormField>
                        </Col>
                        <Col>
                            <FormField label={'Время приема'}>
                                <TimePicker/>
                            </FormField>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={24}>
                            <FormField label={'ФИО'}>
                                <Input/>
                            </FormField>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={24}>
                            <FormField label={'Подразделение'}>
                                <Select/>
                            </FormField>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormField label={'Врач'}>
                                <Select/>
                            </FormField>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormField label={'Специальность врача'}>
                                <Select/>
                            </FormField>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormField label={'Тип услуги'}>
                                <Select/>
                            </FormField>
                        </Col>
                    </Row>
                </form>
            )}
        </Formik>
    )
}

export default NewAppointmentForm
