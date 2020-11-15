import React, {FC} from "react"
import {FormContext, useForm} from "react-hook-form"
import {Col, Divider, Row} from "antd";

import FormState from "./types";

import QuotaSection from "./components/sections/QuotaSection/QuotaSection";
import SurgerySection from "./components/sections/SurgerySection/SurgerySection";

const QuotaForm: FC = () => {
    const form = useForm<FormState>({
        mode: 'onChange',
        defaultValues: {
            quotas: [
                {
                    id: '1',
                    step: 1
                },
                {
                    id: '2',
                    step: 2
                },
                {
                    id: '3',
                    step: 3
                },
            ]
        }
    })

    const submitFunc = (values: any) => {
        console.log(values)
    }

    return (
        <FormContext {...form}>
            <form className={'quota-form'} onSubmit={submitFunc}>
                <Row>
                    <Col span={24}>
                        <QuotaSection/>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <SurgerySection/>
                    </Col>
                </Row>
            </form>
        </FormContext>
    )
}

export default QuotaForm
