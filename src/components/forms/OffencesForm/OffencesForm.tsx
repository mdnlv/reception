import React, {FC} from 'react'
import {useForm, FormContext, Controller} from 'react-hook-form'
import DropDownContent from "../../elements/DropDownContent/DropDownContent";
import ArrayField from '../components/ArrayField/ArrayField';
import {Input, Row, Col, DatePicker} from 'antd';
import FormField from "../components/FormField/FormField";
import moment from "moment";

const OffencesForm: FC = (props) => {

    const form = useForm()

    return (
        <FormContext {...form}>
            <form className={'offences-form'}>
                <div className={'form-section'}>
                    <DropDownContent title={'Правонарушения'}>
                        <ArrayField fieldName={'offences'} renderChild={
                            (key, index) => (
                                <Row gutter={16} key={key} align={'bottom'}>
                                    <Col span={2}>
                                        <FormField label={'Статья УК'}>
                                            <Controller
                                                as={<Input/>}
                                                name={`offences[${index}]}.article`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={2}>
                                        <FormField label={'Суд'}>
                                            <Controller
                                                as={<Input/>}
                                                name={`offences[${index}]}.court`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={2}>
                                        <FormField label={'№ дела'}>
                                            <Controller
                                                as={<Input/>}
                                                name={`offences[${index}]}.number`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={3}>
                                        <FormField label={'Дата постановления'}>
                                            <Controller
                                                as={<DatePicker defaultValue={moment()}/>}
                                                name={`offences[${index}]}.fromDate`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={3}>
                                        <FormField label={'Постановление'}>
                                            <Controller
                                                as={<Input/>}
                                                name={`offences[${index}]}.resolution`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={4}>
                                        <FormField label={'Врач'}>
                                            <Controller
                                                as={<Input/>}
                                                name={`offences[${index}]}.doctor`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={3}>
                                        <FormField label={'Дата очередного обращения в суд'}>
                                            <Controller
                                                as={<DatePicker defaultValue={moment()}/>}
                                                name={`offences[${index}]}.nextCourtDate`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={5}>
                                        <FormField label={'Примечание'}>
                                            <Controller
                                                as={<Input/>}
                                                name={`offences[${index}]}.note`}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                </Row>
                            )
                        } />
                    </DropDownContent>
                </div>
            </form>
        </FormContext>
    )
}

export default OffencesForm
