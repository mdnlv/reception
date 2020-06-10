import React, {FC} from 'react'
import {FormContext, useForm} from 'react-hook-form'
import FormState from "./types";
import { Row, Col } from 'antd';
import PersonInvalidity from "./components/sections/PersonInvalidity/PersonInvalidity";
import PersonPrivileges from "./components/sections/PersonPrivileges/PersonPrivileges";
import {Formik} from "formik";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";


const PrivilegesForm: FC = (props) => {

    const store = useSelector((state: RootState) => state.registrationCard)


    return (
        <Formik
            initialValues={store.privileges}
            onSubmit={() => {}}
        >
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
        </Formik>
    )
}

export default PrivilegesForm
