import React, {FC} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import RegistrationCard from "../views/RegistrationCard/RegistrationCard";
import {Button, Result} from "antd";
import MainPage from "../views/MainPage/MainPage";
import PatientCard from "../views/PatientCard/PatientCard";

const AppRouter: FC = (props) => {
    return (
        <Switch>
            <Route exact path='/regcard'>
                <RegistrationCard/>
            </Route>
            <Route path='/card'>
                <PatientCard/>
            </Route>
            <Route path={'/'}>
                <MainPage/>
            </Route>
            <Route path='*'>
                <Result
                    status='404'
                    title='404'
                    subTitle='Страницы не сущесвует'
                    className={'not-found-page'}
                />
            </Route>
        </Switch>
    )
}

export default AppRouter
