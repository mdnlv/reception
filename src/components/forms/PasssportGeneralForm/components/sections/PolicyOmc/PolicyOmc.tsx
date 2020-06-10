import React, {FC} from 'react'
import {Button, Col, Input, Row, Select, Space, DatePicker} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {FormikProps, useFormikContext} from "formik";
import moment from "moment";
import FormState from "../../../types";

const PolicyOmc: FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className="form-section policy-omc">
            <h2>Полис ОМС</h2>
            <Row className="form-row" align={'bottom'} gutter={16}>
                <Col span={3}>
                    <Button className={'policy-omc__btn'}>
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
                        <DatePicker value={moment(form.values.policyOms.from)} onChange={form.handleChange} />
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'До'}>
                        <DatePicker value={moment(form.values.policyOms.to)} onChange={form.handleChange} />
                    </FormField>
                </Col>
                <Col span={2}>
                    <FormField label={'Серия'}>
                        <Input name={'policyOms.serial'} value={form.values.policyOms.serial} onChange={form.handleChange} />
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'Номер'}>
                        <Input name={'policyOms.number'} value={form.values.policyOms.number} onChange={form.handleChange} />
                    </FormField>
                </Col>
            </Row>
            <Row className='form-row' gutter={16}>
                <Col span={14}>
                    <FormField label='СМО' labelPosition='left'>
                        <Select/>
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
                        <Input name={'policyOms.name'} value={form.values.policyOms.name} onChange={form.handleChange} />
                    </FormField>
                </Col>
            </Row>
            <Row className='form-row'>
                <Col span={24}>
                    <FormField labelPosition='left' label='Примечание'>
                        <Input.TextArea name={'policyOms.note'} value={form.values.policyOms.note} onChange={form.handleChange} />
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

export default PolicyOmc
