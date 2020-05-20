import React, {FC} from 'react'
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Row, Col, Select, Input, DatePicker} from 'antd';
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import FormState from "../../../types";
import moment from "moment";

const Inspection: FC = (props) => {

    const {control} = useFormContext<FormState>()

    return (
        <div className={'form-section person-inspection'}>
            <DropDownContent title={'Обследования'}>
                <ArrayField fieldName={'inspections'} renderChild={
                    (key, index) => (
                        <Row gutter={16} key={key}>
                            <Col span={6}>
                                <FormField label={'Класс'}>
                                    <Controller
                                        as={<Select/>}
                                        name={`inspections[${index}].class`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={6}>
                                <FormField label={'Тип'}>
                                    <Controller
                                        as={<Select/>}
                                        name={`inspections[${index}].class`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={3}>
                                <FormField label={'Дата начала'}>
                                    <Controller
                                        as={<DatePicker defaultValue={moment()}/>}
                                        name={`inspections[${index}].class`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={3}>
                                <FormField label={'Дата окончания'}>
                                    <Controller
                                        as={<DatePicker defaultValue={moment()}/>}
                                        name={`inspections[${index}].class`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col span={6}>
                                <FormField label={'Примечание'}>
                                    <Controller
                                        as={<Input/>}
                                        name={`inspections[${index}].note`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                        </Row>
                    )
                }/>
            </DropDownContent>
        </div>
    )
}

export default Inspection
