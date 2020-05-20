import React, {FC} from "react";
import {Controller, FormContext, useForm, useFormContext} from "react-hook-form";
import {Col, Row, Select} from "antd";
import ArrayField from "../components/ArrayField/ArrayField";
import FormField from "../components/FormField/FormField";
import DropDownContent from "../../elements/DropDownContent/DropDownContent";

const AttachmentsForm: FC = (props) => {

    const form = useForm()

    return (
        <FormContext {...form}>
            <form className={'attachments-form'}>
                <DropDownContent title={'Прикреплениe'}>
                    <ArrayField fieldName={'attachments'} renderChild={
                        (key, index) => (
                            <Row gutter={16} key={key}>
                                <Col span={3}>
                                    <FormField label={'Тип'}>
                                        <Controller
                                            as={<Select/>}
                                            name={`attachments[${index}].type`}
                                            control={form.control}
                                        />
                                    </FormField>
                                </Col>
                                <Col span={6}>
                                    <FormField label={'ЛПУ'}>
                                        <Controller
                                            as={<Select/>}
                                            name={`attachments[${index}].type`}
                                            control={form.control}
                                        />
                                    </FormField>
                                </Col>
                                <Col span={4}>
                                    <FormField label={'Подразделение'}>
                                        <Controller
                                            as={<Select/>}
                                            name={`attachments[${index}].type`}
                                            control={form.control}
                                        />
                                    </FormField>
                                </Col>
                                <Col span={3}>
                                    <FormField label={'Дата прикрепления'}>
                                        <Controller
                                            as={<Select/>}
                                            name={`attachments[${index}].type`}
                                            control={form.control}
                                        />
                                    </FormField>
                                </Col>
                                <Col span={3}>
                                    <FormField label={'Дата открепления'}>
                                        <Controller
                                            as={<Select/>}
                                            name={`attachments[${index}].type`}
                                            control={form.control}
                                        />
                                    </FormField>
                                </Col>
                                <Col span={5}>
                                    <FormField label={'Причина открепления'}>
                                        <Controller
                                            as={<Select/>}
                                            name={`attachments[${index}].type`}
                                            control={form.control}
                                        />
                                    </FormField>
                                </Col>
                            </Row>
                        )
                    }/>
                </DropDownContent>
            </form>
        </FormContext>
    )
}

export default AttachmentsForm
