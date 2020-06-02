import React, {FC, useEffect} from 'react'
import {Button, Col, DatePicker, Input, Row, Select, Space} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import FormState from "../../../types";
import moment from "moment";

const PolicyDmc: FC = (props) => {

    const {control, watch, setValue, getValues} = useFormContext<FormState>()
    const allFormFields = watch()

    useEffect(() => {
        console.log(allFormFields)
    }, [allFormFields])

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
                        <Controller name='f' as={<Select/>} control={control}/>
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'С'}>
                        <Controller name='policyDmc.from' as={<DatePicker/>} control={control}/>
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'До'}>
                        <Controller name='policyDmc.to' as={<DatePicker/>} control={control}/>
                    </FormField>
                </Col>
                <Col span={2}>
                    <FormField label={'Серия'}>
                        <Controller name='policyDms.serial' as={<Input/>} control={control}/>
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'Номер'}>
                        <Controller name='policyDmc.number' as={<Input/>} control={control}/>
                    </FormField>
                </Col>
            </Row>
            <Row className='form-row' gutter={16}>
                <Col span={14}>
                    <FormField label='СМО' labelPosition='left'>
                        <Controller name={'policyDms.cmo'} as={<Select/>} control={control}/>
                    </FormField>
                </Col>
                <Col span={10}>
                    <FormField>
                        <Controller name={'policyDms.type'} as={<Select/>} control={control}/>
                    </FormField>
                </Col>
            </Row>
            <Row className='form-row'>
                <Col span={24}>
                    <FormField labelPosition='left' label='Название'>
                        <Controller name={'policyDmc.name'} as={<Input/>} control={control}/>
                    </FormField>
                </Col>
            </Row>
            <Row className='form-row'>
                <Col span={24}>
                    <FormField labelPosition='left' label='Примечание'>
                        <Controller name={'policyDmc.note'} as={<Input.TextArea/>} control={control}/>
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
