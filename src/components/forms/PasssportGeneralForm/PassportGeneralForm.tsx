import React, {FC} from 'react'
import {Button, Col, Divider, Input, Radio, Row, Select, Space} from "antd";
import {Controller, useForm, useFormContext} from "react-hook-form";
import {FormState} from "./types";
import FormField from "../components/FormField/FormField";
import './styles.scss'


const PassportGeneralForm: FC = (props) => {

    const {control} = useForm<FormState>()

    return (
        <form className='passport-general-form'>
            <Row align={'stretch'}>
                <Col span={12}>
                    <div className="form-section address-registration">
                        <h3>Адрес регистрации</h3>
                        <Row gutter={16} justify='end' className='form-row'>
                            <Col span={8}>
                                <div className='passport-general-form__top'>
                                    <Radio>
                                        КЛАДР
                                    </Radio>
                                    <Radio>
                                        сельский житель
                                    </Radio>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16} className='form-row'>
                            <Col span={8}>
                                <FormField>
                                    <Controller
                                        as={<Select/>}
                                        name={'passportInfo.addressRegistration.city'}
                                        control={control}
                                        placeholder={'Город'}
                                    />
                                </FormField>
                            </Col>
                            <Col span={8}>
                                <FormField>
                                    <Controller
                                        as={<Select/>}
                                        name={'passportInfo.addressRegistration.area'}
                                        control={control}
                                        placeholder={'Область'}

                                    />
                                </FormField>
                            </Col>
                        </Row>
                        <Row gutter={16} className='form-row'>
                            <Col span={8}>
                                <FormField>
                                    <Controller
                                        name={'passportInfo.addressRegistration.street'}
                                        as={<Select/>}
                                        control={control}
                                        placeholder='Улица'
                                    />
                                </FormField>
                            </Col>
                            <Col span={8}>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <FormField>
                                            <Controller
                                                name={'passportInfo.addressRegistration.houseNumber'}
                                                as={<Input/>}
                                                control={control}
                                                placeholder={'Дом'}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={8}>
                                        <FormField>
                                            <Controller
                                                name={'passportInfo.addressRegistration.houseCharacter'}
                                                as={<Input/>}
                                                control={control}
                                                placeholder={'Корпус'}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={8}>
                                        <FormField>
                                            <Controller
                                                name={'passportInfo.addressRegistration.flatNumber'}
                                                as={<Input/>}
                                                control={control}
                                                placeholder={'Кв'}
                                            />
                                        </FormField>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <FormField>
                                    <Radio>
                                        Соответствует адресу прописки
                                    </Radio>
                                </FormField>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="form-section address-registration">
                        <h3>Адрес прописки</h3>
                        <Row gutter={16} justify='end' className='form-row'>
                            <Col span={8}>
                                <div className='passport-general-form__top'>
                                    <Radio>
                                        КЛАДР
                                    </Radio>
                                    <Radio>
                                        сельский житель
                                    </Radio>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16} className='form-row'>
                            <Col span={8}>
                                <FormField>
                                    <Controller
                                        as={<Select/>}
                                        name={'passportInfo.addressRegistration.city'}
                                        control={control}
                                        placeholder={'Город'}
                                    />
                                </FormField>
                            </Col>
                            <Col span={8}>
                                <FormField>
                                    <Controller
                                        as={<Select/>}
                                        name={'passportInfo.addressRegistration.area'}
                                        control={control}
                                        placeholder={'Область'}

                                    />
                                </FormField>
                            </Col>
                        </Row>
                        <Row gutter={16} className='form-row'>
                            <Col span={8}>
                                <FormField>
                                    <Controller
                                        name={'passportInfo.addressRegistration.street'}
                                        as={<Select/>}
                                        control={control}
                                        placeholder='Улица'
                                    />
                                </FormField>
                            </Col>
                            <Col span={8}>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <FormField>
                                            <Controller
                                                name={'passportInfo.addressRegistration.houseNumber'}
                                                as={<Input/>}
                                                control={control}
                                                placeholder={'Дом'}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={8}>
                                        <FormField>
                                            <Controller
                                                name={'passportInfo.addressRegistration.houseCharacter'}
                                                as={<Input/>}
                                                control={control}
                                                placeholder={'Корпус'}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={8}>
                                        <FormField>
                                            <Controller
                                                name={'passportInfo.addressRegistration.flatNumber'}
                                                as={<Input/>}
                                                control={control}
                                                placeholder={'Кв'}
                                            />
                                        </FormField>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <FormField>
                                    <Radio>
                                        Соответствует адресу прописки
                                    </Radio>
                                </FormField>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Divider/>
            <Row>
                <Col span={12}>
                    <div className="form-section address-registration">
                        <h3>Адрес прописки</h3>
                        <Row gutter={16} justify='end' className='form-row'>
                            <Col span={8}>
                                <div className='passport-general-form__top'>
                                    <Radio>
                                        КЛАДР
                                    </Radio>
                                    <Radio>
                                        сельский житель
                                    </Radio>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16} className='form-row'>
                            <Col span={8}>
                                <FormField>
                                    <Controller
                                        as={<Select/>}
                                        name={'passportInfo.addressRegistration.city'}
                                        control={control}
                                        placeholder={'Город'}
                                    />
                                </FormField>
                            </Col>
                            <Col span={8}>
                                <FormField>
                                    <Controller
                                        as={<Select/>}
                                        name={'passportInfo.addressRegistration.area'}
                                        control={control}
                                        placeholder={'Область'}

                                    />
                                </FormField>
                            </Col>
                        </Row>
                        <Row gutter={16} className='form-row'>
                            <Col span={8}>
                                <FormField>
                                    <Controller
                                        name={'passportInfo.addressRegistration.street'}
                                        as={<Select/>}
                                        control={control}
                                        placeholder='Улица'
                                    />
                                </FormField>
                            </Col>
                            <Col span={8}>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <FormField>
                                            <Controller
                                                name={'passportInfo.addressRegistration.houseNumber'}
                                                as={<Input/>}
                                                control={control}
                                                placeholder={'Дом'}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={8}>
                                        <FormField>
                                            <Controller
                                                name={'passportInfo.addressRegistration.houseCharacter'}
                                                as={<Input/>}
                                                control={control}
                                                placeholder={'Корпус'}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={8}>
                                        <FormField>
                                            <Controller
                                                name={'passportInfo.addressRegistration.flatNumber'}
                                                as={<Input/>}
                                                control={control}
                                                placeholder={'Кв'}
                                            />
                                        </FormField>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <FormField>
                                    <Radio>
                                        Соответствует адресу прописки
                                    </Radio>
                                </FormField>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="form-section address-registration">
                        <h3>Адрес прописки</h3>
                        <Row gutter={16} justify='end' className='form-row'>
                            <Col span={8}>
                                <div className='passport-general-form__top'>
                                    <Radio>
                                        КЛАДР
                                    </Radio>
                                    <Radio>
                                        сельский житель
                                    </Radio>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16} className='form-row'>
                            <Col span={8}>
                                <FormField>
                                    <Controller
                                        as={<Select/>}
                                        name={'passportInfo.addressRegistration.city'}
                                        control={control}
                                        placeholder={'Город'}
                                    />
                                </FormField>
                            </Col>
                            <Col span={8}>
                                <FormField>
                                    <Controller
                                        as={<Select/>}
                                        name={'passportInfo.addressRegistration.area'}
                                        control={control}
                                        placeholder={'Область'}

                                    />
                                </FormField>
                            </Col>
                        </Row>
                        <Row gutter={16} className='form-row'>
                            <Col span={8}>
                                <FormField>
                                    <Controller
                                        name={'passportInfo.addressRegistration.street'}
                                        as={<Select/>}
                                        control={control}
                                        placeholder='Улица'
                                    />
                                </FormField>
                            </Col>
                            <Col span={8}>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <FormField>
                                            <Controller
                                                name={'passportInfo.addressRegistration.houseNumber'}
                                                as={<Input/>}
                                                control={control}
                                                placeholder={'Дом'}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={8}>
                                        <FormField>
                                            <Controller
                                                name={'passportInfo.addressRegistration.houseCharacter'}
                                                as={<Input/>}
                                                control={control}
                                                placeholder={'Корпус'}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={8}>
                                        <FormField>
                                            <Controller
                                                name={'passportInfo.addressRegistration.flatNumber'}
                                                as={<Input/>}
                                                control={control}
                                                placeholder={'Кв'}
                                            />
                                        </FormField>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <FormField>
                                    <Radio>
                                        Соответствует адресу прописки
                                    </Radio>
                                </FormField>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Divider/>
            <Row>
                <Col span={12}>
                    <div className="form-section">
                        <h3>Полис ОМС</h3>
                        <Row className="form-row" gutter={16}>
                            <Col span={3}>
                                <Button>
                                    Искать
                                </Button>
                            </Col>
                            <Col span={4}>
                                <FormField>
                                    <Controller name='f' as={<Select/>} control={control}/>
                                </FormField>
                            </Col>
                            <Col span={5}>
                                <FormField>
                                    <Controller name='f' as={<Select/>} control={control}/>
                                </FormField>
                            </Col>
                            <Col span={5}>
                                <FormField>
                                    <Controller name='f' as={<Select/>} control={control}/>
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField>
                                    <Controller name='f' as={<Select/>} control={control}/>
                                </FormField>
                            </Col>
                            <Col span={5}>
                                <FormField>
                                    <Controller name='f' as={<Select/>} control={control}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className='form-row'>
                            <Col span={24}>
                                <FormField labelPosition='left' label='СМО'>
                                    <Controller name={'fd'} as={<Input/>} control={control}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className='form-row'>
                            <Col span={24}>
                                <FormField labelPosition='left' label='Примечание'>
                                    <Controller name={'fd'} as={<Input.TextArea/>} control={control}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className='form-row'>
                            <Col span={8} offset={16}>
                                <Space>
                                    <Button type={'link'} danger>
                                        Закрыть полис
                                    </Button>
                                    <Button type={'primary'}>
                                        Добавить полис
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="form-section">
                        <h3>Полис ОМС</h3>
                        <Row className="form-row" gutter={16}>
                            <Col span={3}>
                                <Button>
                                    Искать
                                </Button>
                            </Col>
                            <Col span={4}>
                                <FormField>
                                    <Controller name='f' as={<Select/>} control={control}/>
                                </FormField>
                            </Col>
                            <Col span={5}>
                                <FormField>
                                    <Controller name='f' as={<Select/>} control={control}/>
                                </FormField>
                            </Col>
                            <Col span={5}>
                                <FormField>
                                    <Controller name='f' as={<Select/>} control={control}/>
                                </FormField>
                            </Col>
                            <Col span={2}>
                                <FormField>
                                    <Controller name='f' as={<Select/>} control={control}/>
                                </FormField>
                            </Col>
                            <Col span={5}>
                                <FormField>
                                    <Controller name='f' as={<Select/>} control={control}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className='form-row'>
                            <Col span={24}>
                                <FormField labelPosition='left' label='СМО'>
                                    <Controller name={'fd'} as={<Input/>} control={control}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className='form-row'>
                            <Col span={24}>
                                <FormField labelPosition='left' label='Примечание'>
                                    <Controller name={'fd'} as={<Input.TextArea/>} control={control}/>
                                </FormField>
                            </Col>
                        </Row>
                        <Row className='form-row'>
                            <Col span={8} offset={16}>
                                <Space>
                                    <Button type={'link'} danger>
                                        Закрыть полис
                                    </Button>
                                    <Button type={'primary'}>
                                        Добавить полис
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </form>
    )
}

export default PassportGeneralForm
