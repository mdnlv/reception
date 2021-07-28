import React, { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
  const isAuth = useSelector((state: RootState) => state.auth.isLogining);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => isAuth ? <Redirect to="/home"/> : <Redirect to="/auth"/>}
      />
      <Route path={"/auth"}>
        <AuthPage/>
      </Route>
      <Route exact path="/regCard/:id">
        <RegistrationCard />
      </Route>
      <Route path="/deferred-calls">
        <DeferredCallsPage/>
      </Route>
      <Route exact path="/info">
        <InfoPage />
      </Route>
      <Route path="/card/:id">
        <PatientCard />
      </Route>
      <Route path={'/home'}>
        <MainPage />
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
