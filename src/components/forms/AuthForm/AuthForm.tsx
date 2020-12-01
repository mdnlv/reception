import React from "react";
import { Formik } from "formik";
import FormField from "../components/FormField/FormField";
import FastInput from "../components/fields/FastInput/FastInput";
import {Button, Checkbox} from "antd/lib";

enum Labels {
    Login = "Логин",
    Password = 'Пароль',
    ShowPass = 'показать пароль',
    Button = 'Войти'
}

const AuthForm: React.FC = (props) => {
    return (
        <Formik
            initialValues={{
                login: "",
                password: "",
                showPass: false
            }}
            onSubmit={() => {}}
            validationSchema={{}}
        >
            {formProps => <form className={'auth-form'}>
                <h1>Войти в систему</h1>
                <FormField label={Labels.Login}>
                    <FastInput name={"login"}/>
                </FormField>
                <FormField label={Labels.Password}>
                    <FastInput name={"password"} type={formProps.values.showPass ? "text" : "password"}/>
                    <Checkbox value={formProps.values.showPass} name={"showPass"} onChange={formProps.handleChange}>
                        {Labels.ShowPass}
                    </Checkbox>
                </FormField>
                <FormField>
                    <Button>{Labels.Button}</Button>
                </FormField>
            </form>}
        </Formik>
    )
}

export default AuthForm
