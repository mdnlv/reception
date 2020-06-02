import React, {FC, useEffect} from 'react'
import {Row, Col, Select, Input, InputNumber} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from 'react-hook-form';
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import FormState from "../../../types";
import {useSelector} from "react-redux";
import {RegistrationCardState} from "../../../../../../store/registrationCard/types";

const PersonFeatures: FC = (props) => {

    const {control, getValues} = useFormContext<FormState>()

    return (
        <div className={'form-section'}>
            <DropDownContent title={'Особенности'}>
                <Row>
                    <Col span={4}>
                        <FormField label={'Группа крови'}>
                            <Controller
                                as={<Select/>}
                                name={'features.bloodGroup'}
                                control={control}
                            />
                        </FormField>
                    </Col>
                    <Col offset={2} span={7}>
                        <FormField label={'Примечание'}>
                            <Controller
                                as={<Input/>}
                                name={'features.note'}
                                control={control}
                            />
                        </FormField>
                    </Col>
                </Row>
                <Row gutter={16} align={'bottom'}>
                    <Col>
                        <FormField label={'Диагноз'}>
                            <Controller
                                as={<Input/>}
                                name={'features.diagnose'}
                                control={control}
                            />
                        </FormField>
                    </Col>
                    <Col>
                        <FormField labelPosition={'left'} label={'Рост при рождении'}>
                            <Controller
                                as={<InputNumber/>}
                                name={'features.birthHeight'}
                                control={control}
                            />
                        </FormField>
                    </Col>
                    <Col>
                        <FormField labelPosition={'left'} label={'Вес при рождении'}>
                            <Controller
                                as={<InputNumber/>}
                                name={'features.birthWeight'}
                                control={control}
                            />
                        </FormField>
                    </Col>
                    <Col>
                        <FormField labelPosition={'left'} label={'Неделя эмбрионального периода'}>
                            <Controller
                                as={<InputNumber/>}
                                name={'features.weekEmbryonic'}
                                control={control}
                            />
                        </FormField>
                    </Col>
                </Row>
            </DropDownContent>
        </div>
    )
}

export default PersonFeatures
