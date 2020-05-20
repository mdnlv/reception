import React, {FC} from 'react'
import {Col, Input, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";

const PersonAllergy: FC = (props) => {

    const {control} = useFormContext()

    return (
        <div className={'form-section person-allergy'}>
            <DropDownContent title={'Аллергия'}>
                <Row gutter={16}>
                    <Col span={5}>
                        <FormField label={'Наименование вещества'}>
                            <Controller
                                as={<Select/>}
                                name={''}
                                control={control}
                            />
                        </FormField>
                    </Col>
                    <Col span={5}>
                        <FormField label={'Степень'}>
                            <Controller
                                as={<Select/>}
                                name={''}
                                control={control}
                            />
                        </FormField>
                    </Col>
                    <Col span={5}>
                        <FormField label={'Дата установления'}>
                            <Controller
                                as={<Select/>}
                                name={''}
                                control={control}
                            />
                        </FormField>
                    </Col>
                </Row>
            </DropDownContent>
        </div>
    )
}

export default PersonAllergy
