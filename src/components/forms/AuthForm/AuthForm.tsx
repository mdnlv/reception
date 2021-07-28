import React from "react";
import {useFormik, FormikProvider} from "formik";
import {Button, Checkbox} from "antd/lib";
import {useDispatch} from "react-redux";

import {Labels} from "./types";
import {login} from "../../../reduxStore/slices/auth/authSlice";

import FormField from "../components/FormField/FormField";
import FastInput from "../components/fields/FastInput/FastInput";

const AuthForm: React.FC = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      showPass: false
    },
    onSubmit: values => {
      dispatch(login({
        username: values.login,
        password: values.password,
        grant_type: 'password'
      }))
    }
  });

  return (
    <FormikProvider value={formik}>
      <form className={'auth-form'}>
        <h1>Войти в систему</h1>
        <FormField label={Labels.Login}>
          <FastInput name={"login"} value={formik.values.login}/>
        </FormField>
        <FormField label={Labels.Password}>
          <FastInput
            name={"password"}
            type={formik.values.showPass ? "text" : "password"}
            value={formik.values.password}
          />
          <Checkbox
            value={formik.values.showPass}
            name={"showPass"}
            onChange={formik.handleChange}
          >
            {Labels.ShowPass}
          </Checkbox>
        </FormField>
        <FormField>
          <Button onClick={formik.handleSubmit}>{Labels.Button}</Button>
        </FormField>
      </form>
    </FormikProvider>
  )
}

export default AuthForm
