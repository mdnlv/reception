import React, {FC} from 'react'
import {Col, Input, Radio, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import FormState from "../../../types";

const AddressRegistration: FC = (props) => {

    const {control} = useFormContext()


    return (<div className="form-section address-registration">
            <h2>Адрес регистрации</h2>
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
    )
}

export default AddressRegistration
