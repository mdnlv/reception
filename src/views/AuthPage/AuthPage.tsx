import React from 'react';
import {Redirect} from "react-router";
import {useSelector} from "react-redux";

import './styles.scss';
import {RootState} from "../../reduxStore/store";

import AuthForm from "../../components/forms/AuthForm/AuthForm";

const AuthPage: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isLogining);

  if (isAuth) {
    return <Redirect to="/home"/>
  }

  return (
    <div className={'auth-page'}>
      <AuthForm/>
    </div>
  )
}

export default AuthPage
