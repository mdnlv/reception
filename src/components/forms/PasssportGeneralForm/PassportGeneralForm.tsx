import React, {FC} from 'react'
import {Button, Col, Divider, Input, Radio, Row, Select, Space} from "antd";
import {Controller, FormContext, useForm, useFormContext} from "react-hook-form";
import {FormState} from "./types";
import FormField from "../components/FormField/FormField";
import './styles.scss'
import AddressRegistration from "./components/sections/AddressRegistration/AddressRegistration";
import PolicyOmc from "./components/sections/PolicyOmc/PolicyOmc";
import AddressDocumentedRegistration
    from "./components/sections/AddressDocumentedRegistration/AddressDocumentedRegistration";
import PolicyDmc from "./components/sections/PolicyDmc/PolicyDmc";
import PersonalDocument from "./components/sections/PersonalDocuments/PersonalDocuments";
import PersonalContacts from "./components/sections/PersonalContacts/PersonalContacts";


const PassportGeneralForm: FC = (props) => {

    const form = useForm<FormState>({
        defaultValues: {
            contacts: [
                {
                    number: '234324'
                },
                {
                    number: '234324'
                },
                {
                    number: '234324'
                }
            ]
        }
    })
    const control = form.control

    return (
        <FormContext {...form}>
            <form className='passport-general-form'>
                <Row align={'stretch'}>
                    <Col span={12}>
                        <AddressRegistration/>
                    </Col>
                    <Col span={12}>
                        <AddressDocumentedRegistration/>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={12}>
                        <PolicyOmc/>
                    </Col>
                    <Col span={12}>
                        <PolicyDmc/>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={12}>
                        <PersonalDocument/>
                    </Col>
                    <Col span={12}>
                        <PersonalContacts/>
                    </Col>
                </Row>
                <Divider/>
            </form>
        </FormContext>
    )
}

export default PassportGeneralForm
