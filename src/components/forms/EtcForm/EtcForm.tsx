import React, {FC} from 'react'
import {FormContext, useForm, Controller} from 'react-hook-form'
import {Col, DatePicker, Row, Select, Input} from "antd";
import DropDownContent from "../../elements/DropDownContent/DropDownContent";
import FormField from "../components/FormField/FormField";
import ArrayField from "../components/ArrayField/ArrayField";

const EtcForm: FC = (props) => {

    const form = useForm()

    return (
        <FormContext {...form}>
            <form className={'etc-form'}>
                <div className="form-section">
                    <DropDownContent title={'Прочее'}>
                        <ArrayField
                            fieldName={''}
                            renderChild={() => (
                                <>
                                    <Row gutter={16}>
                                        <Col>
                                            <FormField label={'Вы получили информацию о нашем учереждении'}>
                                                <Controller
                                                    as={<Select/>}
                                                    name={''}
                                                    control={form.control}
                                                />
                                            </FormField>
                                        </Col>
                                        <Col>
                                            <FormField label={'Дата'}>
                                                <Controller
                                                    as={<DatePicker/>}
                                                    name={''}
                                                    control={form.control}
                                                />
                                            </FormField>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormField label={'Примечание'}>
                                                <Controller
                                                    as={<Input.TextArea/>}
                                                    name={''}
                                                    control={form.control}
                                                />
                                            </FormField>
                                        </Col>
                                    </Row>
                                </>
                            )}/>
                    </DropDownContent>
                </div>
            </form>
        </FormContext>
    )
}


export default EtcForm
