import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { Result } from 'antd';
import {useSelector} from "react-redux";

import DeferredCallsPage from "../views/DeferredCallsPage/DeferredCallsPage";
import AuthPage from "../views/AuthPage/AuthPage";
import {RootState} from "../reduxStore/store";

const RegistrationCard = React.lazy(() =>
  import('../views/RegistrationCard/RegistrationCard'),
);
const MainPage = React.lazy(() => import('../views/MainPage/MainPage'));
const PatientCard = React.lazy(() =>
  import('../views/PatientCard/PatientCard'),
);
const InfoPage = React.lazy(() => import('../views/InfoPage/InfoPage'));

const AppRouter: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const getRedirect = (page: JSX.Element) => token ? page : <Redirect to="/auth"/>;

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => getRedirect(<MainPage/>)}
      />
      <Route path={"/auth"}>
        <AuthPage/>
      </Route>
      <Route
        path="/regCard/:id"
        render={() => getRedirect(<RegistrationCard />)}
      />
      <Route
        path="/deferred-calls"
        render={() => getRedirect(<DeferredCallsPage/>)}
      />
      <Route
        path="/info"
        render={() => getRedirect(<InfoPage />)}
      />
      <Route
        path="/card/:id"
        render={() => getRedirect(<PatientCard />)}
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
