import React, {FC, useEffect} from 'react'
import {Button, Col, Divider, Input, Radio, Row, Select, Space} from "antd";
import {Controller, FormContext, useForm, useFormContext} from "react-hook-form";
import FormState from "./types";
import FormField from "../components/FormField/FormField";
import './styles.scss'
import AddressRegistration from "./components/sections/AddressRegistration/AddressRegistration";
import PolicyOmc from "./components/sections/PolicyOmc/PolicyOmc";
import AddressDocumentedRegistration
    from "./components/sections/AddressDocumentedRegistration/AddressDocumentedRegistration";
import PolicyDmc from "./components/sections/PolicyDmc/PolicyDmc";
import PersonalDocument from "./components/sections/PersonalDocuments/PersonalDocuments";
import PersonalContacts from "./components/sections/PersonalContacts/PersonalContacts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import moment from "moment";


const PassportGeneralForm: FC = (props) => {

    const store = useSelector((state: RootState) => state.registrationCard)
    const dispatch = useDispatch()
    const form = useForm<FormState>({
        defaultValues: store.passportGeneral
    })

    return (
        <FormContext {...form}>
            <form className='passport-general-form'>
                <Row align={'stretch'}>
                    <Col span={12} className={'col--border-right'}>
                        <AddressRegistration/>
                    </Col>
                    <Col span={12}>
                        <AddressDocumentedRegistration/>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={12} className={'col--border-right'}>
                        <PolicyOmc/>
                    </Col>
                    <Col span={12}>
                        <PolicyDmc/>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={12} className={'col--border-right'}>
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
