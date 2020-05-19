import React, {FC} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import RegistrationCard from "../views/RegistrationCard/RegistrationCard";
import {Button, Result} from "antd";

const AppRouter: FC = (props) => {
    return (
        <Router>
            <Switch>
                <Route exact path='/card'>
                    <RegistrationCard/>
                </Route>
                <Route path='*'>
                    <Result
                        status='404'
                        title='404'
                        subTitle='Страницы не сущесвует'
                    ></Result>
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter
