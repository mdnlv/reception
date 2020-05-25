import React, {FC} from 'react'
import {Controller, FormContext, useForm} from 'react-hook-form'
import DropDownContent from "../../elements/DropDownContent/DropDownContent";
import {Col, Input, Row, DatePicker, Select} from 'antd';
import FormField from "../components/FormField/FormField";
import ArrayField from "../components/ArrayField/ArrayField";

const OutsideIdentificationForm: FC = (props) => {

    const form = useForm()

    return (
        <FormContext {...form}>
            <div className={'form-section'}>
                <DropDownContent title={'Идентификаторы во внешних учетных системах'}>
                    <ArrayField
                        fieldName={''}
                        renderChild={() => (
                            <Row gutter={16}>
                                <Col span={5}>
                                    <FormField label={'Примечание'}>
                                        <Controller
                                            as={<Select/>}
                                            name={''}
                                            control={form.control}
                                        />
                                    </FormField>
                                </Col>
                                <Col span={5}>
                                    <FormField label={'Примечание'}>
                                        <Controller
                                            as={<Select/>}
                                            name={''}
                                            control={form.control}
                                        />
                                    </FormField>
                                </Col>
                                <Col span={3}>
                                    <FormField label={'Примечание'}>
                                        <Controller
                                            as={<DatePicker/>}
                                            name={''}
                                            control={form.control}
                                        />
                                    </FormField>
                                </Col>
                            </Row>
                        )}/>
                </DropDownContent>
            </div>
        </FormContext>
    )
}

export default OutsideIdentificationForm
