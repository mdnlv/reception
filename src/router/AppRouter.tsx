import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Result } from 'antd';

const RegistrationCard = React.lazy(() =>
  import('../views/RegistrationCard/RegistrationCard'),
);
const MainPage = React.lazy(() => import('../views/MainPage/MainPage'));

const AppRouter: React.FC = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <MainPage/>}
      />
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
