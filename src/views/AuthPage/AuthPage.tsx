import React from 'react'
import './styles.scss'
import AuthForm from "../../components/forms/AuthForm/AuthForm";

const AuthPage: React.FC = (props) => {
    return (
        <div className={'auth-page'}>
            <AuthForm/>
        </div>
    )
}

export default AuthPage
