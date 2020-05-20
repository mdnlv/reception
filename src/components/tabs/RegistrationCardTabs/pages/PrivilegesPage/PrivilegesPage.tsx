import React, {FC} from 'react'
import PrivilegesForm from "../../../../forms/PrivilegesForm/PrivilegesForm";

const PrivilegesPage: FC = (props) => {
    return (
        <div className={'card-page privileges-page'}>
            <PrivilegesForm/>
        </div>
    )
}

export default PrivilegesPage
