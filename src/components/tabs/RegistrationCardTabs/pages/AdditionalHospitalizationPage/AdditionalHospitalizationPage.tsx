import React, {FC} from 'react'

import AdditionalHospitalizationForm
    from "../../../../forms/AdditionalHospitalizationForm/AdditionalHospitalizationForm";

const AdditionalHospitalizationPage: FC = () => {
    return (
        <div className={'card-page'}>
            <AdditionalHospitalizationForm/>
        </div>
    )
}

export default AdditionalHospitalizationPage
