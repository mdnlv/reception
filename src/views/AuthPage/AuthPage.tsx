import React from 'react';
import {useSelector} from "react-redux";
import {Row, Spin} from "antd";

import './styles.scss';
import {RootState} from "../../reduxStore/store";

import AuthForm from "../../components/forms/AuthForm/AuthForm";

const AuthPage: React.FC = () => {
  const isLogining = useSelector((state: RootState) => state.auth.isLogining);

  return isLogining ? (
    <Row style={{ height: '100vh' }} justify={'center'} align={'middle'}>
      <Spin />
    </Row>
  ) : (
    <div className={'auth-page'}>
      <AuthForm/>
    </div>
  )
}

export default AuthPage
