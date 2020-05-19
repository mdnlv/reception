import React, {FC, useEffect} from 'react'
import {Button, Col, Input, Radio, Row, Select, Space, Tooltip, DatePicker, Divider} from "antd";
import PlusIcon from "../../../../../../assets/icons/plus.svg";
import TrashIcon from "../../../../../../assets/icons/trash.svg";
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import {FormState} from "../../../types";
import FormField from "../../../../components/FormField/FormField";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";

const SocialStatus: FC = (props) => {

    const {control} = useFormContext<FormState>()
    const {fields, append} = useFieldArray({
        control,
        name: 'socialStatus',
    })

    useEffect(() => {
        append({
            name: 'socialStatus'
        })
    }, [])

    return (
        <div className={'form-section social-status'}>
            <DropDownContent title={'Соц.статус'}>
                <Space>
                    <Tooltip title={'Добавить еще одну'}>
                        <Button shape='circle' onClick={() => {
                        }}  icon={<img src={PlusIcon}/>} className={'full-icon'}/>
                    </Tooltip>
                    <Tooltip title={'Удалить'} >
                        <Button disabled={fields.length <= 0} shape='circle' onClick={() => {
                        }} icon={<img alt={'delete-icon'} src={TrashIcon}/>}/>
                    </Tooltip>
                </Space>
                <Row>
                    {fields.map((item, index) => (
                        <Col span={24} key={item.id}>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <FormField label='Класс'>
                                        <div className='center-wrapper'>
                                            <Controller name={`contacts[${index}].isMain`} as={<Select/>} control={control}/>
                                        </div>
                                    </FormField>
                                </Col>
                                <Col span={6}>
                                    <FormField label='Тип'>
                                        <Controller name={`contacts[${index}].number`} as={<Select/>} control={control}/>
                                    </FormField>
                                </Col>
                                <Col span={3}>
                                    <FormField label='Дата начала'>
                                        <Controller name={`contacts[${index}].type`} as={<DatePicker/>} control={control}/>
                                    </FormField>
                                </Col>
                                <Col span={3}>
                                    <FormField label='Дата окончания'>
                                        <Controller name={`contacts[${index}].note`} as={<DatePicker/>} control={control}/>
                                    </FormField>
                                </Col>
                                <Col span={6}>
                                    <FormField label='Примечания'>
                                        <Controller name={`contacts[${index}].note`} as={<Input/>} control={control}/>
                                    </FormField>
                                </Col>
                            </Row>
                            <Divider/>
                        </Col>
                    ))}
                </Row>
            </DropDownContent>
        </div>
    )
}

export default SocialStatus
