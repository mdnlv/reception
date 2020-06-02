import React, {FC, useEffect, useMemo, useState} from 'react'
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import ArrayField from "../../../../components/ArrayField/ArrayField";
import {Row, Col, Select, Input} from 'antd';
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";
import QuotaDetailed from "../../cards/QuotaDetailed/QuotaDetailed";
import FormState from "../../../types";
import './styles.scss'

const QuotaSection: FC = (props) => {

    const form = useFormContext<FormState>()
    const [quotaIndex, setQuotaIndex] = useState(0)


    const handleRowClick = (index: number) => {
        if(quotaIndex !== index){
            setQuotaIndex(index)
        }
    }

    const getActiveRowClass = (index: number) => {
        if(index === quotaIndex){
            return 'quota-item quota-item--active'
        }else{
            return 'quota-item'
        }
    }

    const watchQuotas = form.watch('quotas')

    useEffect(() => {
        console.log(form.getValues())
    }, [watchQuotas])

    return (
        <div className={'form-section person-quotas'}>
            <Row align={"stretch"}>
                <Col span={8}>
                    <DropDownContent title={'Квоты'}>
                        <ArrayField<FormState>
                            fieldName={'quotas'}
                            renderChild={(key, index) => (
                                <Row key={key} className={getActiveRowClass(index)} onClick={() => {
                                    handleRowClick(index)
                                }} gutter={16}>
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
                                                as={<Input/>}
                                                name={`quotas[${index}].step`}
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
                    <QuotaDetailed currentIndex={quotaIndex}/>
                </Col>
            </Row>
        </div>
    )
}

export default QuotaSection
