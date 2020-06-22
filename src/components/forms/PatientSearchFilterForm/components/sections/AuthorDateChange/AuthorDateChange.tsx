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
            <h2>Нетрудоспособность</h2>
            <Row align={'stretch'} gutter={16}>
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
                <FormField>
                    <Select/>
                </FormField>
            </Row>
            <Row gutter={16}>
                <Col span={10}>
                    <FormField label={'Тип документа'}>
                        <DatePicker onChange={form.handleChange} value={moment(form.values.authorAndDate?.createdDate)}/>
                    </FormField>
                </Col>
                <Col span={10}>
                    <FormField label={'Дата создания'}>
                        <DatePicker onChange={form.handleChange} value={moment(form.values.authorAndDate?.createdDate)}/>
                    </FormField>
                </Col>
            </Row>
        </div>
    )
}

export default AuthorDateChange

