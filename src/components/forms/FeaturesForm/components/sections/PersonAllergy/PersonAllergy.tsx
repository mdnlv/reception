import React, {FC, useEffect} from 'react'
import {Col, DatePicker, Input, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import FormState from "../../../types";



const PersonAllergy: FC = (props) => {

    const {control, watch, getValues, formState} = useFormContext<FormState>()

    return (
        <div className={'form-section person-allergy'}>
            <DropDownContent title={'Аллергия'}>
                <Row gutter={16}>
                    <Col span={5}>
                        <FormField label={'Наименование вещества'}>
                            <Controller
                                as={<Select/>}
                                name={'allergy.name'}
                                control={control}
                            />
                        </FormField>
                    </Col>
                    <Col span={5}>
                        <FormField label={'Степень'}>
                            <Controller
                                as={<Select/>}
                                name={'allergy.degree'}
                                control={control}
                            />
                        </FormField>
                    </Col>
                    <Col span={5}>
                        <FormField label={'Дата установления'}>

                        </FormField>
                    </Col>
                </Row>
            </DropDownContent>
        </div>
    )
}

export default PersonAllergy
