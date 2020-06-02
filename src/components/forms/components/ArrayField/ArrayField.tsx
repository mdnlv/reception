import React, {useEffect, useState} from 'react'
import {useFieldArray, useFormContext} from "react-hook-form";
import FormState from "../../EmploymentForm/types";
import {Button, Space, Tooltip} from "antd";
import { PlusOutlined, MinusOutlined, PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';


type FieldProps<T> = {
    fieldName: string
    renderChild: (key: string, index: number) => JSX.Element
}

function ArrayField<T>(props: FieldProps<T>) {

    const {control} = useFormContext<T>()
    const {fields, append, remove} = useFieldArray({
        control,
        name: props.fieldName
    })

    function addItem() {
        append({name: 'item'})
    }

    function removeLast() {
        if(fields.length){
            remove(fields.length - 1)
        }
    }

    function getFieldsContent() {
        return fields.map((field, index) => {
            return props.renderChild(field.id!, index)
        })
    }

    return (
        <>
            <Space>
                <Tooltip title={'Добавить'}>
                    <Button type={'link'} size={'small'} shape='circle' onClick={() => {
                        addItem()
                    }}  icon={<PlusCircleTwoTone className={'fields-btn__icon'}/>} className={'full-icon'}/>
                </Tooltip>
                <Tooltip title={'Удалить'} >
                    <Button type={'link'} size={'small'} disabled={fields.length <= 0} shape='circle' onClick={() => {
                        removeLast()
                    }} icon={<MinusCircleTwoTone className={'fields-btn__icon'}/>}/>
                </Tooltip>
            </Space>
            {getFieldsContent()}
        </>
    )
}

export default ArrayField
