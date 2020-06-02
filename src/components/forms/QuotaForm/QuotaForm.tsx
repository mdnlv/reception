import React, {FC} from "react"
import {Controller, FormContext, useForm} from "react-hook-form"
import QuotaDetailed from "./components/cards/QuotaDetailed/QuotaDetailed";
import ArrayField from "../components/ArrayField/ArrayField";
import {Col, Divider, Row, Select} from "antd";
import FormField from "../components/FormField/FormField";
import DropDownContent from "../../elements/DropDownContent/DropDownContent";
import QuotaSection from "./components/sections/QuotaSection/QuotaSection";
import SurgerySection from "./components/sections/SurgerySection/SurgerySection";
import FormState from "./types";

const QuotaForm: FC = (props) => {

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
