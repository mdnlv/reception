import React, {FC} from "react";
import PersonViewTypeForm from "../../../../forms/PersonViewTypeForm/PersonViewTypeForm";

const ViewTypesPage: FC = (props) => {
    return (
        <div className={'card-page view-types-page'}>
            <PersonViewTypeForm/>
        </div>
    )
}

export default ViewTypesPage
