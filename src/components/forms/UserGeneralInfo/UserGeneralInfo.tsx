import React, {FC, useEffect} from 'react'
import {Col, Divider, Form, Input, Row, DatePicker, Radio, Select, Button, TimePicker} from "antd"
import './styles.scss'
import {Controller, useForm} from "react-hook-form";
import {FormState} from "./types";
import FormField from "../components/FormField/FormField";

const UserGeneralInfo: FC = (props) => {

    const {register, handleSubmit, watch, errors, control, getValues, formState, setValue} = useForm<FormState>({
        defaultValues: {
            codeNumber: '21313',
        }
    })


    return (
        <form
            className="registration-form"
        >
            <FormField label='Код'>
                <Controller
                    as={(
                        <Input/>
                    )}
                    name='codeNumber'
                    control={control}
                />
            </FormField>
            <FormField label='Фамилия'>
                <Controller
                    as={(
                        <Input/>
                    )}
                    name='lastName'
                    control={control}
                />
            </FormField>
            <FormField label='Имя'>
                <Controller
                    as={(
                        <Input/>
                    )}
                    name='firstName'
                    control={control}
                />
            </FormField>
            <FormField label='Отчество'>
                <Controller
                    as={(
                        <Input/>
                    )}
                    name='patrName'
                    control={control}
                />
            </FormField>
            <Divider/>
            <div className='registration-form__dates'>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormField label='Дата'>
                            <Controller
                                as={(
                                    <DatePicker/>
                                )}
                                name='birthDate'
                                control={control}
                            />
                        </FormField>
                    </Col>
                    <Col span={12}>
                        <FormField label='Время'>
                            <Controller
                                as={(
                                    <TimePicker format={'HH:mm'}/>
                                )}
                                name='birthTime'
                                control={control}
                            ></Controller>
                        </FormField>
                    </Col>
                </Row>
            </div>
            <div className="registration-form__general">
                <Row gutter={16}>
                    <Col
                        span={12}
                    >
                        <FormField label='Пол'>
                            <Radio>
                                М
                            </Radio>
                            <Radio>
                                Ж
                            </Radio>
                        </FormField>
                    </Col>
                    <Col
                        span={6}
                    >
                        <FormField label='Рост'>
                            <Controller as={(
                                <Input/>
                            )}
                            name='height'
                            control={control}
                        />
                        </FormField>
                    </Col>
                    <Col
                        span={6}
                    >
                        <FormField label='Вес'>
                            <Controller as={(
                                <Input/>
                            )}
                            control={control}
                            name='weight'/>
                        </FormField>
                    </Col>
                </Row>
            </div>
            <Divider/>
            <div>
                <FormField label='СНИЛС'>
                    <Controller as={(
                        <Input/>
                    )}
                    name='snils'
                    control={control}
                    />
                </FormField>
                <FormField label='Лечащий врач'>
                    <Controller as={(
                        <Select/>
                    )}
                    name='doctor'
                    control={control}
                    />
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
                    <Controller as={(
                        <DatePicker/>
                    )}
                    control={control}
                    name='cardStartDate'
                    />
                </FormField>

                <Radio>
                    карта заведена
                </Radio>
                <Radio>
                    есть только временная регистрация
                </Radio>
            </div>
            <Divider/>
            <div>
                <FormField label='Место рождения'>
                    <Controller className='form-field-wrapper' name='birthPlace' as={(
                       <Select/>
                    )}
                    control={control}
                    />
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
                    console.log(getValues())
                }} className='save-btn'>
                    Сохранить
                </Button>
            </div>
        </form>
    )
}

export default UserGeneralInfo
