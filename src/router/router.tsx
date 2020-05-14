import React, {FC} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import RegistrationCard from "../views/RegistrationCard/RegistrationCard";

const AppRouter: FC = (props) => {
    return (
        <Router>
            <Switch>
                <Route path="/card">
                    <RegistrationCard/>
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter
