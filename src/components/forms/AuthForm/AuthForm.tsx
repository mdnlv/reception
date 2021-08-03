import React, {useEffect} from "react";
import {useFormik, FormikProvider} from "formik";
import {Button, Checkbox, message} from "antd/lib";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";

import {Labels} from "./types";
import {login} from "../../../reduxStore/slices/auth/authSlice";
import {RootState} from "../../../reduxStore/store";
import './styles.scss';
import logo from '../../../assets/icons/logo-vista.svg';

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
    console.log('token', token);
    token && navigation.replace('/');
  }, [token]);

  useEffect(() => {
    isLoginError && message.error('Не удалось войти');
  }, [isLoginError]);

  return (
    <FormikProvider value={formik}>
      <div className={'auth-form__container'}>
        <img className='auth-form__logo' src={logo} alt='Виста' />
        <form className={'auth-form auth-form__custom-form'}>
          <div className="auth-form__item">
            <FormField label={Labels.Login} labelPosition="left">
              <FastInput name={"login"} value={formik.values.login}/>
            </FormField>
          </div>
          <div className="auth-form__item">
            <FormField label={Labels.Password} labelPosition="left">
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
          </div>
          <div className="auth-form__item">
            <FormField>
              {/*@ts-ignore*/}
              <Button onClick={formik.handleSubmit} className='auth-form__btn'>{Labels.Button}</Button>
            </FormField>
          </div>
        </form>
      </div>
    </FormikProvider>
  )
}

export default AuthForm
