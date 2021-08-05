import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Result } from 'antd';

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

const AppRouter: React.FC = () => {
  //@ts-ignore

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <MainPage/>}
      />
      <Route path={"/auth"}>
        <AuthPage/>
      </Route>
      <Route
        path="/regCard/:id"
        render={() => <RegistrationCard />}
      />
      <Route
        path="/deferred-calls"
        render={() => <DeferredCallsPage/>}
      />
      <Route
        path="/info"
        render={() => <InfoPage />}
      />
      <Route
        path="/card/:id"
        render={() => <PatientCard />}
      />
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
