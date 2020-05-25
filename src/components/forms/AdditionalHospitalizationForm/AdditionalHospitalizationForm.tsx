import React, {FC} from 'react'
import {Controller, FormContext, useForm} from 'react-hook-form'
import DropDownContent from "../../elements/DropDownContent/DropDownContent";
import ArrayField from "../components/ArrayField/ArrayField";
import {Row, Col, Input, DatePicker} from 'antd';
import FormField from "../components/FormField/FormField";

const AdditionalHospitalizationForm: FC = (props) => {

    const form = useForm()

    return (
        <FormContext {...form}>
            <div className={'form-section'}>
                <DropDownContent title={'Дополнительная диспансеризация'}>
                    <ArrayField
                        fieldName={''}
                        renderChild={() => (
                            <Row gutter={16}>
                                <Col>
                                    <FormField label={'Код'}>
                                        <Controller
                                            as={<Input/>}
                                            name={''}
                                            control={form.control}
                                        />
                                    </FormField>
                                </Col>
                                <Col>
                                    <FormField label={'Дата начала'}>
                                        <Controller
                                            as={<DatePicker/>}
                                            name={''}
                                            control={form.control}
                                        />
                                    </FormField>
                                </Col>
                                <Col>
                                    <FormField label={'Дата окончания'}>
                                        <Controller
                                            as={<DatePicker/>}
                                            name={''}
                                            control={form.control}
                                        />
                                    </FormField>
                                </Col>
                                <Col>
                                    <FormField label={'Код МО'}>
                                        <Controller
                                            as={<Input/>}
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

export default AdditionalHospitalizationForm
