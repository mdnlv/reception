import React, {FC} from 'react'
import {Button, Col, Input, Row, Select, Space, DatePicker} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import FormState from "../../../types";

const PolicyOmc: FC = (props) => {

    const {control} = useFormContext<FormState>()

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
                        <Controller name='' as={<Select/>} control={control}/>
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'С'}>
                        <Controller name='' as={<DatePicker/>} control={control}/>
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'До'}>
                        <Controller name='f' as={<DatePicker/>} control={control}/>
                    </FormField>
                </Col>
                <Col span={2}>
                    <FormField label={'Серия'}>
                        <Controller name='f' as={<Input/>} control={control}/>
                    </FormField>
                </Col>
                <Col span={5}>
                    <FormField label={'Номер'}>
                        <Controller name='f' as={<Input/>} control={control}/>
                    </FormField>
                </Col>
            </Row>
            <Row className='form-row' gutter={16}>
                <Col span={14}>
                    <FormField label='СМО' labelPosition='left'>
                        <Controller name={'policyOms.cmo'} as={<Select/>} control={control}/>
                    </FormField>
                </Col>
                <Col span={10}>
                    <FormField>
                        <Controller name={'policyOms.type'} as={<Select/>} control={control}/>
                    </FormField>
                </Col>
            </Row>
            <Row className='form-row'>
                <Col span={24}>
                    <FormField labelPosition='left' label='Название'>
                        <Controller name={'fd'} as={<Input/>} control={control}/>
                    </FormField>
                </Col>
            </Row>
            <Row className='form-row'>
                <Col span={24}>
                    <FormField labelPosition='left' label='Примечание'>
                        <Controller name={'fd'} as={<Input.TextArea/>} control={control}/>
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
