import React, {FC, useEffect} from 'react'
import {FormContext, useForm} from 'react-hook-form'
import {Col, Divider, Row} from "antd";
import PersonFeatures from "./components/sections/PersonFeatures/PersonFeatures";
import PersonAllergy from "./components/sections/PersonAllergy/PersonAllergy";
import MedIntolerance from "./components/sections/MedIntolerance/MedIntolerance";
import AnthropometricData from "./components/sections/AnthropometricData/AnthropometricData";
import FormState from "./types";
import Inspection from "./components/sections/Inspection/Inspection";
import {useDispatch, useSelector} from "react-redux";
import {RegistrationCardState} from "../../../store/registrationCard/types";
import {RootState} from "../../../store/store";
import {setFormSection} from "../../../store/registrationCard/actions";

const FeaturesForm: FC = (props) => {

    const store = useSelector((state: RootState) => state.registrationCard)
    const dispatch = useDispatch()
    const form = useForm<FormState>({
        defaultValues: {...store.features}
    })

    useEffect(() => {
        const payload = {
            ...store,
            features: {
                ...store.features,
                ...form.getValues({nest: true})
            }
        }

        dispatch(setFormSection(
            payload
        ))
    }, [form.formState])

    useEffect(() => {

        const payload = {
            ...store,
            features: {
                ...store.features,
                ...form.getValues({nest: true})
            }
        }

        dispatch(setFormSection(
            payload
        ))
    }, [form, form.formState.dirtyFields])

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
