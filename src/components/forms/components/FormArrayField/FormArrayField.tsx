import React, {useCallback, useMemo, useState} from 'react'
import {Button, Space, Tooltip} from "antd";
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import {useFormContext} from "react-hook-form";


type FieldProps<T> = {
    values: T[]
    name: string
    renderChild: (key: string, index: number) => JSX.Element
}


function FormArrayField<T>(props: FieldProps<T>) {

    const initialValues = props.values?.length || 0
    const [fieldsArr, setFieldsArr] = useState<string[]>(initialValues ? Array.of(initialValues).map((item, index) => {
        return `${props.name}[${index}]`
    }) : [])

    function addItem() {
        let index = 0
        if(fieldsArr.length === 0){
             index = fieldsArr.length
        }else if(fieldsArr.length === 1){
            index = fieldsArr.length
        }else{
            index = fieldsArr.length
        }
        const fieldName = `${props.name}[${index}]`
        setFieldsArr([...fieldsArr, fieldName])
        console.log(props.values)
    }

    function removeItem() {
        setFieldsArr(fieldsArr.slice(0, fieldsArr.length - 1))
    }

    function arrayContent() {
        return fieldsArr.map((item, index) => {
            return props.renderChild(item, index)
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
                    <Button type={'link'} size={'small'} disabled={fieldsArr.length <= 0} shape='circle' onClick={() => {
                        removeItem()
                    }} icon={<MinusCircleTwoTone className={'fields-btn__icon'}/>}/>
                </Tooltip>
            </Space>

            {arrayContent()}
        </>
    )
}

export default FormArrayField
