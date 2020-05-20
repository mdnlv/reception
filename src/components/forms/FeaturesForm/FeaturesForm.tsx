import React, {FC} from 'react'
import {FormContext, useForm} from 'react-hook-form'
import {Col, Divider, Row} from "antd";
import PersonFeatures from "./components/sections/PersonFeatures/PersonFeatures";
import PersonAllergy from "./components/sections/PersonAllergy/PersonAllergy";
import MedIntolerance from "./components/sections/MedIntolerance/MedIntolerance";
import AnthropometricData from "./components/sections/AnthropometricData/AnthropometricData";
import FormState from "./types";
import Inspection from "./components/sections/Inspection/Inspection";

const FeaturesForm: FC = (props) => {

    const form = useForm<FormState>()

    return (
        <FormContext {...form}>
            <form className={'features-form'}>
                <Row>
                    <Col span={24}>
                        <PersonFeatures/>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <PersonAllergy/>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <MedIntolerance/>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <AnthropometricData/>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <Inspection/>
                    </Col>
                </Row>
            </form>
        </FormContext>
    )
}

export default FeaturesForm
