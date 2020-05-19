import React, {FC, useEffect} from 'react'
import {useEditableList} from "../../../../../../hooks/editableList";
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import {FormState} from "../../../types";
import {Space, Button, Tooltip, Row, Col, Radio, Input, Select} from "antd";
import PlusIcon from '../../../../../../assets/icons/plus.svg';
import TrashIcon from '../../../../../../assets/icons/trash.svg';
import FormField from "../../../../components/FormField/FormField";

const PersonalContacts: FC = (props) => {
    const {listState, addNewItem, deleteLastItem} = useEditableList<any>([])
    const {control, getValues, watch} = useFormContext<FormState>()


    const {fields, append, remove} = useFieldArray({
        control,
        name: 'contacts',
    })

    function addNewField(){
        append({
            control,
            name: 'contacts',
        })
    }

    function removeLast() {
        if(fields.length > 0){
            remove(fields.length - 1)
        }
    }


    return (
        <div className={'form-section personal-contacts'}>
            <h2>Контакты</h2>
            <Space>
                <Tooltip title={'Добавить еще одну'}>
                    <Button shape='circle' onClick={() => {
                        addNewField()
                    }}  icon={<img src={PlusIcon}/>} className={'full-icon'}></Button>
                </Tooltip>
                <Tooltip title={'Удалить'} >
                    <Button disabled={fields.length > 0 ? false : true} shape='circle' onClick={() => {
                        removeLast()
                    }} icon={<img src={TrashIcon}/>}></Button>
                </Tooltip>
            </Space>
            <Row>
                {fields.map((item, index) => (
                    <Col span={24} key={item.id}>
                        <Row gutter={16}>
                            <Col span={3}>
                                <FormField label='Основной'>
                                    <div className='center-wrapper'>
                                        <Controller name={`contacts[${index}].isMain`} as={<Radio/>} control={control}/>
                                    </div>
                                </FormField>
                            </Col>
                            <Col span={6}>
                                <FormField label='Номер'>
                                    <Controller name={`contacts[${index}].number`} as={<Input/>} control={control}/>
                                </FormField>
                            </Col>
                            <Col span={5}>
                                <FormField label='Тип'>
                                    <Controller name={`contacts[${index}].type`} as={<Select/>} control={control}/>
                                </FormField>
                            </Col>
                            <Col span={10}>
                                <FormField label='Примечания'>
                                    <Controller name={`contacts[${index}].note`} as={<Input/>} control={control}/>
                                </FormField>
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default PersonalContacts
