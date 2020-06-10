import React, {FC} from 'react'
import {useForm, FormContext, Controller} from 'react-hook-form'
import DropDownContent from "../../elements/DropDownContent/DropDownContent";
import ArrayField from '../components/ArrayField/ArrayField';
import {Input, Row, Col, DatePicker} from 'antd';
import FormField from "../components/FormField/FormField";
import moment from "moment";
import {Formik} from "formik";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import FormArrayField from "../components/FormArrayField/FormArrayField";

const OffencesForm: FC = (props) => {

    const store = useSelector((state: RootState) => state.registrationCard)

    return (
        <Formik
            initialValues={store.offences}
            onSubmit={() => {}}
        >
            {formProps => (
                <form className={'offences-form'}>
                    <div className={'form-section'}>
                        <DropDownContent title={'Правонарушения'}>
                            <FormArrayField name={'offences'} values={formProps.values.offences} renderChild={
                                (key, index) => (
                                    <Row gutter={16} key={key} align={'bottom'}>
                                        <Col span={2}>
                                            <FormField label={'Статья УК'}>
                                                <Input name={`offences[${index}]}.article`} onChange={formProps.handleChange}/>
                                            </FormField>
                                        </Col>
                                        <Col span={2}>
                                            <FormField label={'Суд'}>
                                                <Input name={`offences[${index}]}.court`} onChange={formProps.handleChange}/>
                                            </FormField>
                                        </Col>
                                        <Col span={2}>
                                            <FormField label={'№ дела'}>
                                                <Input name={`offences[${index}]}.number`} onChange={formProps.handleChange}/>
                                            </FormField>
                                        </Col>
                                        <Col span={3}>
                                            <FormField label={'Дата постановления'}>
                                                <DatePicker value={moment(formProps.values.offences[index]?.startDate)}
                                                            onChange={(_, date) => {
                                                                formProps.setFieldValue(`offences[${index}]}.fromDate`, date)
                                                            }}
                                                />
                                            </FormField>
                                        </Col>
                                        <Col span={3}>
                                            <FormField label={'Постановление'}>
                                                <Input name={`offences[${index}]}.resolution`} onChange={formProps.handleChange}/>
                                            </FormField>
                                        </Col>
                                        <Col span={4}>
                                            <FormField label={'Врач'}>
                                                <Input name={`offences[${index}]}.doctor`} onChange={formProps.handleChange}/>
                                            </FormField>
                                        </Col>
                                        <Col span={3}>
                                            <FormField label={'Дата очередного обращения в суд'}>
                                                <DatePicker value={moment(formProps.values.offences[index]?.nextCourtDate)}
                                                            onChange={(_, date) => {
                                                                formProps.setFieldValue(`offences[${index}]}.nextCourtDate`, date)
                                                            }}
                                                />
                                            </FormField>
                                        </Col>
                                        <Col span={5}>
                                            <FormField label={'Примечание'}>
                                                <Input name={`offences[${index}]}.note`} onChange={formProps.handleChange}/>
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

export default OffencesForm
