import React, { FC, useEffect, useCallback } from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Result } from 'antd';
import {useSelector} from "react-redux";

import {RootState} from "../reduxStore/store";

import DeferredCallsPage from "../views/DeferredCallsPage/DeferredCallsPage";
import AuthPage from "../views/AuthPage/AuthPage";

const RegistrationCard = React.lazy(() =>
  import('../views/RegistrationCard/RegistrationCard'),
);
const MainPage = React.lazy(() => import('../views/MainPage/MainPage'));
const PatientCard = React.lazy(() =>
  import('../views/PatientCard/PatientCard'),
);
const InfoPage = React.lazy(() => import('../views/InfoPage/InfoPage'));

const AppRouter: FC = () => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log('token', token);
  }, [token]);

  const getRedirect = useCallback(() => token ? <MainPage /> : <Redirect to="/auth"/>, [token]);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={getRedirect}
      />
      <Route path={"/auth"}>
        <AuthPage/>
      </Route>
      <Route path="/regCard/:id">
        <RegistrationCard />
      </Route>
      <Route path="/deferred-calls">
        <DeferredCallsPage/>
      </Route>
      <Route path="/info">
        <InfoPage />
      </Route>
      <Route path="/card/:id">
        <PatientCard />
      </Route>
      <Route path="*">
        <Result
          status="404"
          title="404"
          subTitle="Страницы не сущесвует"
          className={'not-found-page'}
        />
      </Route>
    </Switch>
  );
};

export default AppRouter;
