import React, {FC} from 'react'
import {FormContext, useForm} from "react-hook-form";
import {Col, Row} from 'antd';
import PersonEmployment from "./components/sections/PersonEmployment/PersonEmployment";
import PersonHazard from "./components/sections/PersonHazard/PersonHazard";

const EmploymentForm: FC = (props) => {
    const form = useForm({
        defaultValues: {
            hazardHistory: [
                {
                    hazardDescription: 'sadasd',
                    exp: 2
                },
                {
                    hazardDescription: 'sadasd1',
                    exp: 2
                }
            ]
        }
    })

    return (
        <FormContext {...form}>
            <form className={'employment-form'}>
                <Row>
                    <Col span={24}>
                      <PersonEmployment/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <PersonHazard/>
                    </Col>
                </Row>
            </form>
        </FormContext>
    )
}

export default EmploymentForm
