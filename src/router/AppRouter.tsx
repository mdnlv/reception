import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import { Result } from 'antd';
import {useSelector} from "react-redux";

import {RootState} from "../reduxStore/store";

import AuthPage from "../views/AuthPage/AuthPage";

const RegistrationCard = React.lazy(() =>
  import('../views/RegistrationCard/RegistrationCard'),
);
const MainPage = React.lazy(() => import('../views/MainPage/MainPage'));

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
        render={() => <RegistrationCard />}
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
