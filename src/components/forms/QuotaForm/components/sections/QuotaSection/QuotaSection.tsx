import React, {FC} from 'react'
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Row, Col, Select} from 'antd';
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import QuotaDetailed from "../../cards/QuotaDetailed/QuotaDetailed";
import FormState from "../../../types";

const QuotaSection: FC = (props) => {

    const form = useFormContext<FormState>()

    return (
        <div className={'form-section'}>
            <Row>
                <Col span={8}>
                    <DropDownContent title={'Квоты'}>
                        <ArrayField
                            fieldName={''}
                            renderChild={() => (
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <FormField label={'Квота'}>
                                            <Controller
                                                as={<Select/>}
                                                name={''}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={6}>
                                        <FormField label={'Этап'}>
                                            <Controller
                                                as={<Select/>}
                                                name={''}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={6}>
                                        <FormField label={'МКБ'}>
                                            <Controller
                                                as={<Select/>}
                                                name={''}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                    <Col span={6}>
                                        <FormField label={'Статус'}>
                                            <Controller
                                                as={<Select/>}
                                                name={''}
                                                control={form.control}
                                            />
                                        </FormField>
                                    </Col>
                                </Row>
                            )}/>
                    </DropDownContent>
                </Col>
                <Col span={16}>
                    <QuotaDetailed/>
                </Col>
            </Row>
        </div>
    )
}

export default QuotaSection
