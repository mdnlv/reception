import React, {FC, useEffect} from 'react'
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import {Button, Col, Divider, Input, InputNumber, Radio, Row, Select, Space, Tooltip} from "antd";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import FormField from "../../../../components/FormField/FormField";
import PlusIcon from "../../../../../../assets/icons/plus.svg";
import TrashIcon from "../../../../../../assets/icons/trash.svg";

const PersonEmployment: FC = (props) => {

    const {control} = useForm()
    const {fields, append} = useFieldArray({
        control,
        name: 'employments'
    })


    useEffect(() => {
        append({
            name: 'employments'
        })
    }, [])


    return (
        <div className={'form-section'}>

            <DropDownContent title={'Занятось'}>
                <Space>
                    <Tooltip title={'Добавить еще одну'}>
                        <Button shape='circle' onClick={() => {

                        }}  icon={<img src={PlusIcon}/>} className={'full-icon'}></Button>
                    </Tooltip>
                    <Tooltip title={'Удалить'} >
                        <Button disabled={fields.length > 0 ? false : true} shape='circle' onClick={() => {

                        }} icon={<img src={TrashIcon}/>}></Button>
                    </Tooltip>
                </Space>
                {fields.map((item, index) => (
                    <Row gutter={16}>
                        <Col span={8}>
                            <FormField label={'Организация'}>
                                <Controller name={`employements[${index}]`} as={<Select/>} control={control}/>
                            </FormField>
                        </Col>
                        <Col span={8}>
                            <FormField label={'Должность'}>
                                <Controller name={`employements[${index}]`} as={<Input/>} control={control}/>
                            </FormField>
                            <FormField label={'Стаж'}>
                                <Controller name={`employements[${index}]`} as={<InputNumber/>} control={control}/>
                            </FormField>
                        </Col>
                        <Col span={8}>
                            <FormField label={'ИНН'}>
                                <Controller name={`employements[${index}]`} as={<Input/>} control={control}/>
                            </FormField>
                            <FormField label={'ОГРН'}>
                                <Controller name={`employements[${index}]`} as={<Input/>} control={control}/>
                            </FormField>
                        </Col>
                    </Row>
                ))}
                <Divider/>
                <Row gutter={16} align={'bottom'}>
                    <Col span={3}>
                        <FormField label={'ОКВЭД'}>
                            <Controller name={`employements`} as={<Select/>} control={control}/>
                        </FormField>
                    </Col>
                    <Col span={5}>
                        <FormField>
                            <Controller name={`employements`} as={<Input/>} control={control}/>
                        </FormField>
                    </Col>
                    <Col span={4}>
                        <FormField label={'Адрес'}>
                            <Controller name={`employements`} as={<Input/>} control={control}/>
                        </FormField>
                    </Col>
                </Row>
                <Divider/>
            </DropDownContent>
        </div>
    )
}

export default PersonEmployment
