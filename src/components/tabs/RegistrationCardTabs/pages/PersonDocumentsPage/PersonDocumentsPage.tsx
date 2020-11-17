import React, {FC} from 'react'

import PersonDocumentsForm from "../../../../forms/PersonDocumentsForm/PersonDocumentsForm";

const PersonDocumentsPage: FC = () => {
    return (
        <div className={'person-documents-page card-page'}>
            <PersonDocumentsForm/>
        </div>
    )
}

export default PersonDocumentsPage
