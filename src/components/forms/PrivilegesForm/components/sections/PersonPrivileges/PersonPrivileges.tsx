import React, {FC} from "react";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Col, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import FormState from "../../../types";


const PersonPrivileges: FC = (props) => {

    const {control} = useFormContext<FormState>()

    return (
        <div className={'form-section person-privileges'}>
            <DropDownContent title={'Льготы'}>
                <ArrayField fieldName={'privileges'} renderChild={
                    (key, index) => (
                        <Row gutter={16} key={key}>
                            <Col>
                                <FormField label={'Тип'}>
                                    <Controller
                                        as={<Select/>}
                                        name={''}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата начала'}>
                                    <Controller
                                        as={<Select/>}
                                        name={''}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата окончания'}>
                                    <Controller
                                        as={<Select/>}
                                        name={''}
                                        control={control}
                                    />
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Причина прекращения наблюдения'}>
                                    <Controller
                                        as={<Select/>}
                                        name={''}
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

export default PersonPrivileges
