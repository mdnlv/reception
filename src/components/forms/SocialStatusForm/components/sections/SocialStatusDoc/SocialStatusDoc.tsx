import React, {FC} from 'react'
import {Col, DatePicker, Input, Row, Select} from 'antd'
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import {FormState} from "../../../types";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";


const SocialStatusDoc: FC = (props) => {

    const {control} = useFormContext<FormState>()

    return (
        <div className={'form-section social-status-doc'}>
            <DropDownContent title={'Документ, подтверждающий соц.статус'}>
                <Row gutter={16} align={"bottom"}>
                    <Col span={3}>
                        <FormField >
                            <Controller name={``} as={<Select/>} control={control}/>
                        </FormField>
                    </Col>
                    <Col span={3}>
                        <FormField label={'Серия'}>
                            <Controller name={``} as={<Input/>} control={control}/>
                        </FormField>
                    </Col>
                    <Col span={3}>
                        <FormField label={'Номер'}>
                            <Controller name={``} as={<Input/>} control={control}/>
                        </FormField>
                    </Col>
                </Row>
                <Row >
                    <Col span={3}>
                        <FormField label={'Дата'}>
                            <Controller name={``} as={<DatePicker/>} control={control}/>
                        </FormField>
                    </Col>
                    <Col span={5}>
                        <FormField label={'Выдан'}>
                            <Controller name={``} as={<Select/>} control={control}/>
                        </FormField>
                    </Col>
                </Row>
            </DropDownContent>
        </div>
    )
}

export default SocialStatusDoc
