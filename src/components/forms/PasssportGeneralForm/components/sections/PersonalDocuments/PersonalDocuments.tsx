import React, {FC} from 'react'
import {Col, Row, Select, Input, Space, DatePicker} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import {FormState} from "../../../types";

const PersonalDocument: FC = (props) => {

    const {control} = useFormContext<FormState>()

    return (
        <div className='form-section personal-document'>
            <h2>Документ</h2>
            <Row gutter={16}>
                <Col span={5}>
                   <FormField
                       label='Паспорт'
                   >
                       <Controller
                        as={<Select/>}
                        name='dsfe'
                        control={control}
                       />
                   </FormField>
                </Col>
                <Col span={5}>
                    <FormField
                        label='Серия'
                    >
                        <Space>
                            <Controller
                                name={'asddas'}
                                as={<Input/>}
                                control={control}
                            />
                            <Controller
                                name={'asddas'}
                                as={<Input/>}
                                control={control}
                            />
                        </Space>
                    </FormField>
                </Col>
                <Col span={4}>
                    <FormField
                        label='Номер'
                    >
                        <Controller
                            name={'asddas'}
                            as={<Input/>}
                            control={control}
                        />
                    </FormField>
                </Col>
                <Col span={4}>
                    <FormField
                        label='Дата выдачи'
                    >
                        <Controller
                            name={'asddas'}
                            as={<DatePicker/>}
                            control={control}
                        />
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField
                        label='Кем выдан'
                    >
                        <Controller
                            name={'asddas'}
                            as={<Input/>}
                            control={control}
                        />
                    </FormField>
                </Col>
            </Row>
        </div>
    )
}

export default PersonalDocument
