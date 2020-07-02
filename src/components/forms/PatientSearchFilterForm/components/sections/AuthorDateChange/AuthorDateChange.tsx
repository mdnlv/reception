import React from "react"
import {Checkbox, Col, DatePicker, Input, Radio, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import moment from "moment";
import {useFormikContext} from "formik";
import FormState from "../../../types";


const AuthorDateChange: React.FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section'}>
            <h2>По автору и дате изменения</h2>
            <Row align={'stretch'} gutter={8}>
                <Col span={12}>
                    <FormField label={'автор создания'} labelPosition={'right'}>
                        <Checkbox name={'authorAndDate.isAuthor'} onChange={form.handleChange} />
                    </FormField>
                </Col>
                <Col span={12}>
                    <FormField label={'автор последнего изменения'} labelPosition={'right'}>
                        <Checkbox name={'authorAndDate.isLastChangedDate'} onChange={form.handleChange} />
                    </FormField>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={18}>
                    <FormField>
                        <Select size={'small'}/>
                    </FormField>
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={6}>
                    <FormField label={'Тип документа'}>
                        <DatePicker size={'small'} onChange={form.handleChange} value={moment(form.values.authorAndDate?.createdDate)}/>
                    </FormField>
                </Col>
                <Col span={6}>
                    <FormField label={'Дата создания'}>
                        <DatePicker size={'small'} onChange={form.handleChange} value={moment(form.values.authorAndDate?.createdDate)}/>
                    </FormField>
                </Col>
            </Row>
        </div>
    )
}

export default AuthorDateChange

