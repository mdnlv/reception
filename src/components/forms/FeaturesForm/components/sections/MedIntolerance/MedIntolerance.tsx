import React, {FC} from 'react'
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Col, Row, Select} from 'antd';
import {Controller, useFormContext} from "react-hook-form";
import FormField from "../../../../components/FormField/FormField";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";

const MedIntolerance: FC = (props) => {

    const {control} = useFormContext()

    return (
        <div className={'form-section'}>
            <DropDownContent title={'Медикаментозная непереносимость'}>
                <ArrayField fieldName={'medIntolerances'} renderChild={
                    (key, index) => (
                        <Row gutter={16} key={key}>
                            <Col>
                                <FormField label={'Наименование вещества'}>
                                    <Controller
                                        as={<Select/>}
                                        name={`medIntolerances[${index}].name`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Степень'}>
                                    <Controller
                                        as={<Select/>}
                                        name={`medIntolerances[${index}].degree`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата установления'}>
                                    <Controller
                                        as={<Select/>}
                                        name={`medIntolerances[${index}].fromDate`}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                        </Row>
                    )
                }/>
            </DropDownContent>
        </div>
    )
}

export default MedIntolerance
