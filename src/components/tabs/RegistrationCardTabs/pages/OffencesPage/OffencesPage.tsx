import React, {FC} from 'react'
import OffencesForm from "../../../../forms/OffencesForm/OffencesForm";

const OffencesPage: FC = (props) => {
    return (
        <div className={'offences-page card-page'}>
            <OffencesForm/>
        </div>
    )
}

export default OffencesPage
