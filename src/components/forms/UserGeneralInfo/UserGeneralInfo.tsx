import React, {FC, useEffect} from 'react'
import {Col, Divider, Form, Input, Row, DatePicker, Radio, Select, Button, TimePicker} from "antd"
import './styles.scss'
import {Controller, useForm} from "react-hook-form";
import {FormState} from "./types";
import FormField from "../components/FormField/FormField";
import RadioGroup from "antd/es/radio/group";
import {Formik} from "formik";
import moment from "moment";

const UserGeneralInfo: FC = (props) => {

    return (
        <Formik
            initialValues={{
                code: "",
                lastName: "",
                firstName: "",
                patrName: "",
                birthDate: new Date(),
                birthTime: new Date(),
                sex: 'man',
                height: 0,
                weight: 0,
                snils: '',
                startCardDate: new Date()
            }}
            onSubmit={() => {}}
        >
            {formProps => (
                <form
                    className="registration-form"
                >
                    <FormField label='Код'>
                        <Input name={"code"} value={formProps.values.code} onChange={formProps.handleChange}/>
                    </FormField>
                    <FormField label='Фамилия'>
                        <Input name={"lastName"} value={formProps.values.lastName} onChange={formProps.handleChange}/>
                    </FormField>
                    <FormField label='Имя'>
                        <Input name={"firstName"} value={formProps.values.firstName} onChange={formProps.handleChange}/>
                    </FormField>
                    <FormField label='Отчество'>
                        <Input name={"patrName"} value={formProps.values.patrName} onChange={formProps.handleChange}/>
                    </FormField>
                    <Divider/>
                    <div className='registration-form__dates'>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormField label='Дата'>
                                    <DatePicker value={moment(formProps.values.birthDate)} onChange={(_,date) => {
                                        formProps.setFieldValue('birthDate', date)
                                    }}/>
                                </FormField>
                            </Col>
                            <Col span={12}>
                                <FormField label='Время'>
                                    <TimePicker format={'HH:mm'} value={moment(formProps.values.birthTime)} onChange={(_, date) => {
                                        formProps.setFieldValue('birthTime', date)
                                    }}/>
                                </FormField>
                            </Col>
                        </Row>
                    </div>
                    <div className="registration-form__general">
                        <Row gutter={16}>
                            <Col
                                span={14}
                            >
                                <FormField label='Пол'>
                                    <RadioGroup name={"sex"} value={formProps.values.sex} onChange={formProps.handleChange}>
                                        <Radio value={"man"}>
                                            М
                                        </Radio>
                                        <Radio value={"women"}>
                                            Ж
                                        </Radio>
                                    </RadioGroup>
                                </FormField>
                            </Col>
                            <Col
                                span={5}
                            >
                                <FormField label='Рост'>
                                    <Input name={"height"} value={formProps.values.height} onChange={formProps.handleChange}/>
                                </FormField>
                            </Col>
                            <Col
                                span={5}
                            >
                                <FormField label='Вес'>
                                    <Input name={"weight"} value={formProps.values.weight} onChange={formProps.handleChange}/>
                                </FormField>
                            </Col>
                        </Row>
                    </div>
                    <Divider/>
                    <div>
                        <FormField label='СНИЛС'>
                            <Input name={"snils"} value={formProps.values.snils} onChange={formProps.handleChange}/>
                        </FormField>
                        <FormField label='Лечащий врач'>
                           <Select/>
                        </FormField>
                        <div>
                            <Radio>
                                импланты
                            </Radio>
                            <Radio>
                                протезы
                            </Radio>
                        </div>
                    </div>
                    <Divider/>
                    <div>
                        <FormField label='Дата начала карты'>
                            <DatePicker value={moment(formProps.values.startCardDate)}  onChange={(_, date) => {
                                formProps.setFieldValue('startCardDate', date)
                            }} />
                        </FormField>

                        <RadioGroup>
                            <Radio className={'is-ready-card is-radio-btn'}>
                                карта заведена
                            </Radio>
                            <Radio className={'is-temporary-registration is-radio-btn'}>
                                есть только временная регистрация
                            </Radio>
                        </RadioGroup>
                    </div>
                    <Divider/>
                    <div>
                        <FormField label='Место рождения'>
                            <Select/>
                        </FormField>
                    </div>
                    <div className='registration-form__filter-action'>
                        <Button type="link" block>
                            Обновить данные по фильтрам
                        </Button>
                    </div>
                    <div className='registration-form__actions'>
                        <Button type='link' danger>
                            Отмена
                        </Button>
                        <Button onClick={() => {
                            formProps.handleSubmit()
                        }} className='save-btn'>
                            Сохранить
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default UserGeneralInfo
