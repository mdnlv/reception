import React, {FC} from 'react'
import {FormContext, useForm} from 'react-hook-form'
import FormState from "./types";
import { Row, Col } from 'antd';
import PersonInvalidity from "./components/sections/PersonInvalidity/PersonInvalidity";
import PersonPrivileges from "./components/sections/PersonPrivileges/PersonPrivileges";


const PrivilegesForm: FC = (props) => {

    const form = useForm<FormState>()

    return (
        <FormContext {...form}>
            <form className={'privileges-form'}>
                <Row>
                    <Col span={24}>
                        <PersonPrivileges/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <PersonInvalidity/>
                    </Col>
                </Row>
            </form>
        </FormContext>
    )
}

export default PrivilegesForm
