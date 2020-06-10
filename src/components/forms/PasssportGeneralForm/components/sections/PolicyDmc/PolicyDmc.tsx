import React, {FC, useEffect} from 'react'
import {Button, Col, DatePicker, Input, Row, Select, Space} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import FormState from "../../../types";
import moment from "moment";
import {FormikProps, useFormikContext} from "formik";


const PolicyDmc: FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className="form-section policy-dmc">
            <h2>Полис ДМС</h2>
            <Row className="form-row" align={'bottom'} gutter={16}>
                <Col span={3}>
                    <Button className={'policy-dmc__btn'}>
                        Искать
                    </Button>
                </Col>
                <Col span={4}>
                    <FormField>
                        <Select/>
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'С'}>
                        <DatePicker value={moment(form.values.policyDms.from)} onChange={(date, dateString) => {
                            form.setFieldValue('policyDms.from', dateString)
                        }}/>
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'До'}>
                        <DatePicker value={moment(form.values.policyDms.to)} onChange={(date, dateString) => {
                            form.setFieldValue('policyDms.to', dateString)
                        }}/>
                    </FormField>
                </Col>
                <Col span={2}>
                    <FormField label={'Серия'}>
                        <Input name={"policyDms.serial"} value={form.values.policyDms.serial} onChange={form.handleChange}/>
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'Номер'}>
                        <Input name={"policyDms.number"} value={form.values.policyDms.number} onChange={form.handleChange}/>
                    </FormField>
                </Col>
            </Row>
            <Row className='form-row' gutter={16}>
                <Col span={14}>
                    <FormField label='СМО' labelPosition='left'>
                        <Select />
                    </FormField>
                </Col>
                <Col span={10}>
                    <FormField>
                        <Select/>
                    </FormField>
                </Col>
            </Row>
            <Row className='form-row'>
                <Col span={24}>
                    <FormField labelPosition='left' label='Название'>
                        <Input name={"policyDmc.name"} onChange={form.handleChange}/>
                    </FormField>
                </Col>
            </Row>
            <Row className='form-row'>
                <Col span={24}>
                    <FormField labelPosition='left' label='Примечание'>
                        <Input.TextArea name={"policyDmc.note"} onChange={form.handleChange}/>
                    </FormField>
                </Col>
            </Row>
            <Row className='form-row' justify={'end'}>
                <Col>
                    <Space>
                        <Button type={'link'} danger>
                            Закрыть полис
                        </Button>
                        <Button type={'primary'}>
                            Добавить полис
                        </Button>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}

export default PolicyDmc
