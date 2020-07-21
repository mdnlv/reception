import React, {useMemo} from 'react'
import {Col, Descriptions, List, Row} from "antd";
import PersonAppointment from "../../../../../../types/data/PersonAppointment";
import moment from "moment";
import './styles.scss'
import PatientReceptionCard from "../../../../PatientReceptionCard/PatientReceptionCard";

type PaneProps = {
    appointmentsList?: PersonAppointment[]
}

const PersonAppointmentsPane: React.FC<PaneProps> = (props) => {

    const listBody = useMemo(() => {
        if(props.appointmentsList && props.appointmentsList.length > 0){
            return props.appointmentsList.map(item => (
                <div key={item.id} className={'person-appointments-list__item'}>
                    <PatientReceptionCard isPast={true} {...item}/>
                </div>
            ))
        }else{
            return null
        }
    }, [props.appointmentsList])

    return (
        <div className={'person-info-tabs__pane'}>
            {listBody}
        </div>
    )
}

export default PersonAppointmentsPane
