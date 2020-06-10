import React, {FC} from 'react'
import {useForm} from 'react-hook-form'
import {Row, Col, Select, Divider} from 'antd';
import PersonalIdent from "./components/sections/PersonalIdent/PersonalIdent";
import PersonPolicy from "./components/sections/PersonPolicy/PersonPolicy";
import SocialStatus from "./components/sections/SocialStatus/SocialStatus";
import NamedContract from "./components/sections/NamedContract/NamedContract";
import {Formik} from "formik";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";

const PersonDocumentsForm: FC = (props) => {

    const store = useSelector((state: RootState) => state.registrationCard)


    return (
        <Formik
            initialValues={store.personDocs}
            onSubmit={() => {}}
        >
            <form className={'person-documents-form'}>
                <Row>
                    <Col span={24}>
                        <PersonalIdent/>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <PersonPolicy/>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <SocialStatus/>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <NamedContract/>
                    </Col>
                </Row>
            </form>
        </Formik>
    )
}

export default PersonDocumentsForm
