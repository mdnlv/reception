import React, {FC} from "react"
import AttachemntsForm from "../../../../forms/AttachmentsForm/AttachmentsForm";

const AttachmentsPage: FC = (props) => {
    return (
        <div className={'attachments-page card-page'}>
            <div className="form-section">
                <AttachemntsForm/>
            </div>
        </div>
    )
}

export default AttachmentsPage
