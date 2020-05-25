import React, {FC} from 'react'
import PersonLinksForm from "../../../../forms/PersonLinksForm/PersonLinksForm";


const PersonLinksPage: FC = (props) => {
    return (
        <div className={'card-page person-links-page'}>
            <PersonLinksForm/>
        </div>
    )
}

export default PersonLinksPage
