import React from "react"
import {Formik} from "formik";
import {Col, Divider, Input, Row} from "antd";
import FormField from "../components/FormField/FormField";
import MaskedInput from 'antd-mask-input'
import Patient from "../../../types/data/Patient";
import './styles.scss'

type FormPatient = Partial<Patient>

type FormProps = {
    patient?: FormPatient
}

const PatientCardInfoForm: React.FC<FormProps> = (props) => {
    return (
        <Formik
            initialValues={{...props.patient}}
            onSubmit={() => {}}
        >
            {formProps => (
                <form className={'patient-card-info-form'}>
                    <h3 className={'content-title'}>Общая информация</h3>
                    <div className="form-section">
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'Код'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'ФИО'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'Дата рождения'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'Пол'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Divider/>
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'Регистрация'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'Проживает'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'Место рождения'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'Телефон'} labelPosition={'left'}>
                                    <MaskedInput mask={'+7 111 111 11 11'} placeholder={'+7 999 889 89 89'}/>
                                </FormField>
                            </Col>
                        </Row>
                    </div>
                    <h3 className={'content-title'}>Документы</h3>
                    <div className="form-section">
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'СНИЛС'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'Прикрепление'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'Паспорт'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'ОМС'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                    </div>
                    <h3 className={'content-title'}>Медицинская информация</h3>
                    <div className="form-section">
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'Лечащий врач'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'Особенности'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                    </div>
                    <h3 className={'content-title'}>Занятось</h3>
                    <div className="form-section">
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'Место работы'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className={"form-section__item"}>
                            <Col>
                                <FormField label={'Специлизация'} labelPosition={'left'}>
                                    <Input size={'small'}/>
                                </FormField>
                            </Col>
                        </Row>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default PatientCardInfoForm
