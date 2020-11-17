import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import RegistrationCard from '../views/RegistrationCard/RegistrationCard';
import { Result } from 'antd';
import MainPage from '../views/MainPage/MainPage';
import PatientCard from '../views/PatientCard/PatientCard';
import InfoPage from '../views/InfoPage/InfoPage';

const AppRouter: FC = () => {
  return (
    <Switch>
      <Route exact path="/regcard/:id">
        <RegistrationCard />
      </Route>
      <Route exact path="/info">
        <InfoPage />
      </Route>
      <Route path="/card/:id">
        <PatientCard />
      </Route>
      <Route path={'/'}>
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
