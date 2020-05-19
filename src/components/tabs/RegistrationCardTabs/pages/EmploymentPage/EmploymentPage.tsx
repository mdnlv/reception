import React, {FC} from 'react'
import EmploymentForm from "../../../../forms/EmploymentForm/EmploymentForm";

const EmploymentPage: FC = (props) => {
    return (
        <div className={'employment-page card-page'}>
            <EmploymentForm/>
        </div>
    )
}

export default EmploymentPage
