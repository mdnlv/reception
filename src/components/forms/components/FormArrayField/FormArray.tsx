import React from 'react'
import {FieldArray, FormikProps} from "formik";
import {Button, Space, Tooltip} from "antd";
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';

type FormArray = {
    name: string
    fields: any[]
    renderChild(key: string, index: number): void
}

const FormArray: React.FC<FormArray> = (props) => {
    return (
        <div>
            <FieldArray
                name={props.name}
            >
                {(formProps) => (
                    <div>
                        <Space>
                            <Tooltip title={'Добавить'}>
                                <Button type={'link'} size={'small'} shape='circle' onClick={() => {
                                    formProps.push('')
                                }}  icon={<PlusCircleTwoTone className={'fields-btn__icon'}/>} className={'full-icon'}/>
                            </Tooltip>
                            <Tooltip title={'Удалить'} >
                                <Button type={'link'} size={'small'} disabled={props.fields.length <= 0} shape='circle' onClick={() => {
                                    formProps.pop()
                                }} icon={<MinusCircleTwoTone className={'fields-btn__icon'}/>}/>
                            </Tooltip>
                        </Space>
                        <div>
                            {props.fields.map((item, index) => {
                                return props.renderChild(index.toString(), index)
                            })}
                        </div>
                    </div>
                )}
            </FieldArray>
        </div>
    )
}

export default FormArray
