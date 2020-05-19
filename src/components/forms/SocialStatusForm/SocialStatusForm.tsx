import React, {FC} from 'react'
import {FormContext, useForm} from 'react-hook-form'
import {FormState} from "./types";
import {Col, Row} from "antd";
import SocialStatus from "./components/sections/SocialStatus/SocialStatus";
import './styles.scss'
import SocialStatusDoc from "./components/sections/SocialStatusDoc/SocialStatusDoc";

const SocialStatusForm: FC = (props) => {

    const form = useForm<FormState>()

    return (
        <FormContext {...form}>
            <form className={'social-status-form'}>
                <Row>
                    <Col span={24}>
                        <SocialStatus/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <SocialStatusDoc/>
                    </Col>
                </Row>
            </form>
        </FormContext>
    )
}

export default SocialStatusForm
