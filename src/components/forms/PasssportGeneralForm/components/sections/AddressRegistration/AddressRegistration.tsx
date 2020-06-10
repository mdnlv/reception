import React, {FC} from 'react'
import {Checkbox, Col, Input, Radio, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import FormState from "../../../types";
import {FormikProps, useFormikContext} from "formik";


const AddressRegistration: FC = (props) => {

    const form = useFormikContext<FormState>()

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
                        <Select placeholder={'Город'}/>
                    </FormField>
                </Col>
                <Col span={8}>
                    <FormField>
                        <Select placeholder={'Область'}/>
                    </FormField>
                </Col>
            </Row>
            <Row gutter={16} className='form-row'>
                <Col span={8}>
                    <FormField>
                        <Select placeholder={'Улица'}/>
                    </FormField>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <FormField>
                                <Input name={'passportInfo.addressRegistration.houseNumber'}
                                       value={form.values.passportInfo.addressRegistration.houseNumber}
                                        onChange={form.handleChange}
                                />
                            </FormField>
                        </Col>
                        <Col span={8}>
                            <FormField>
                                <Input name={'passportInfo.addressRegistration.flatNumber'}
                                       value={form.values.passportInfo.addressRegistration.flatNumber}
                                       onChange={form.handleChange}
                                />
                            </FormField>
                        </Col>
                        <Col span={8}>
                            <FormField>
                                <Input name={'passportInfo.addressRegistration.flatNumber'}
                                       value={form.values.passportInfo.addressRegistration.flatNumber}
                                       onChange={form.handleChange}
                                />
                            </FormField>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <FormField>
                        <Checkbox checked={form.values.passportInfo.documentedAddress.isDocumentedAddress}
                                  name={'passportInfo.documentedAddress.isDocumentedAddress'}
                                  onChange={form.handleChange}>
                            Соответствует адресу прописки
                        </Checkbox>
                    </FormField>
                </Col>
            </Row>
        </div>
    )
}

export default AddressRegistration
