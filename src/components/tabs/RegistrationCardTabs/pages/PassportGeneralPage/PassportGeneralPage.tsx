import React, {FC} from 'react'
import PassportGeneralForm from "../../../../forms/PasssportGeneralForm/PassportGeneralForm"
import './styles.scss'


const PassportGeneralPage: FC = (props) => {
    return (
        <div className='passport-general-page'>
            <PassportGeneralForm/>
        </div>
    )
}

export default PassportGeneralPage
