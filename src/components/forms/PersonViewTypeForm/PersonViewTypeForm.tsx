import React, {FC} from 'react'
import {FormContext, useForm, Controller} from 'react-hook-form'
import DropDownContent from "../../elements/DropDownContent/DropDownContent";
import ArrayField from "../components/ArrayField/ArrayField";
import {Col, Row, Select, DatePicker, Input} from 'antd';
import FormField from "../components/FormField/FormField";

const PersonViewTypeForm: FC = (props) => {

    const form = useForm()

    return (
        <FormContext {...form}>
            <form className={'person-view-type-form'}>
                <div className="form-section">
                    <DropDownContent title={'Вид наблюдения'}>
                        <ArrayField fieldName={'viewTypes'} renderChild={
                            (key, index) => (
                                <Row gutter={16} key={key}>
                                    <Col span={4}>
                                        <FormField label={'Тип'}>
                                            <Controller
                                                as={<Select/>}
                                                name={`viewTypes[${index}].type`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={6}>
                                        <FormField label={'ЛПУ'}>
                                            <Controller
                                                as={<Select/>}
                                                name={`viewTypes[${index}].lpu`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={3}>
                                        <FormField label={'Дата прикрепления'}>
                                            <Controller
                                                as={<DatePicker/>}
                                                name={`viewTypes[${index}].fromDate`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={3}>
                                        <FormField label={'Дата открепления'}>
                                            <Controller
                                                as={<DatePicker/>}
                                                name={`viewTypes[${index}].toDate`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={7}>
                                        <FormField label={'Причина открепления'}>
                                            <Controller
                                                as={<Select/>}
                                                name={`viewTypes[${index}].note`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                </Row>
                            )
                        }/>
                    </DropDownContent>
                </div>
            </form>
        </FormContext>
    )
}

export default PersonViewTypeForm
