import React, {FC} from "react";
import {Controller, FormContext, useForm, useFormContext} from "react-hook-form";
import {Col, DatePicker, Row, Select} from "antd";
import ArrayField from "../components/ArrayField/ArrayField";
import FormField from "../components/FormField/FormField";
import DropDownContent from "../../elements/DropDownContent/DropDownContent";
import FormArrayField from "../components/FormArrayField/FormArrayField";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {Formik} from "formik";
import moment from "moment";

const AttachmentsForm: FC = (props) => {

    const store = useSelector((state: RootState) => state.registrationCard)

    return (
        <Formik
            initialValues={store.attachments}
            onSubmit={() => {}}
        >
            {formProps => (
                <form className={'attachments-form'}>
                    <div className="form-section">
                        <DropDownContent title={'Прикреплениe'}>
                            <FormArrayField values={store.attachments.attachments} name={'attachments'} renderChild={
                                (key, index) => (
                                    <Row gutter={16} key={key}>
                                        <Col span={3}>
                                            <FormField label={'Тип'}>
                                                <Select/>
                                            </FormField>
                                        </Col>
                                        <Col span={6}>
                                            <FormField label={'ЛПУ'}>
                                                <Select/>
                                            </FormField>
                                        </Col>
                                        <Col span={4}>
                                            <FormField label={'Подразделение'}>
                                                <Select/>
                                            </FormField>
                                        </Col>
                                        <Col span={3}>
                                            <FormField label={'Дата прикрепления'}>
                                                <DatePicker value={moment(formProps.values.attachments[index]?.fromDate)}
                                                            onChange={(_, date) => {
                                                                formProps.setFieldValue('formDate', date)
                                                            }}
                                                />
                                            </FormField>
                                        </Col>
                                        <Col span={3}>
                                            <FormField label={'Дата открепления'}>
                                                <DatePicker value={moment(formProps.values.attachments[index]?.endDate)}
                                                            onChange={(_, date) => {
                                                                formProps.setFieldValue('endDate', date)
                                                            }}
                                                />
                                            </FormField>
                                        </Col>
                                        <Col span={5}>
                                            <FormField label={'Причина открепления'}>
                                                <Select/>
                                            </FormField>
                                        </Col>
                                    </Row>
                                )
                            }/>
                        </DropDownContent>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default AttachmentsForm
