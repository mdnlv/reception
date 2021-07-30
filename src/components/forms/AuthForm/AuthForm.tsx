import React, {useEffect} from "react";
import {useFormik, FormikProvider} from "formik";
import {Button, Checkbox, message} from "antd/lib";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";

import {Labels} from "./types";
import {login} from "../../../reduxStore/slices/auth/authSlice";
import {RootState} from "../../../reduxStore/store";

import FormField from "../components/FormField/FormField";
import FastInput from "../components/fields/FastInput/FastInput";

const AuthForm: React.FC = () => {
  const navigation = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const isLoginError = useSelector((state: RootState) => state.auth.isLoginError);
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

  useEffect(() => {
    token && navigation.replace('/');
  }, [token]);

  useEffect(() => {
    isLoginError && message.error('Не удалось войти');
  }, [isLoginError]);

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
            checked={formik.values.showPass}
            name={"showPass"}
            onChange={formik.handleChange}
          >
            {Labels.ShowPass}
          </Checkbox>
        </FormField>
        <FormField>
          {/*@ts-ignore*/}
          <Button onClick={formik.handleSubmit}>{Labels.Button}</Button>
        </FormField>
      </form>
    </FormikProvider>
  )
}

export default AuthForm
