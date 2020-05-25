import React, {FC} from 'react'
import OutsideHospitalizationForm from "../../../../forms/OutsideHospitalizationForm/OutsideHospitalizationForm";

const OutsideHospitalizationPage: FC = (props) => {
    return (
        <div className={'card-page'}>
            <OutsideHospitalizationForm/>
        </div>
    )
}

export default OutsideHospitalizationPage
