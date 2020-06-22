import React from 'react'
import {Col, Descriptions, List, Row} from "antd";
import PersonAppointment from "../../../../../../types/data/PersonAppointment";
import moment from "moment";
import './styles.scss'

type PaneProps = {
    appointmentsList?: PersonAppointment[]
}

const PersonAppointmentsPane: React.FC<PaneProps> = (props) => {

    const renderPaneList = () => {
        if(props.appointmentsList && props.appointmentsList.length > 0){
            return props.appointmentsList.map(item => (
                <div key={item.id} className={'person-appointments-list__item'}>
                    <Descriptions size={'small'} column={3}>
                        <Descriptions.Item label={'Дата'}>
                            {moment(item?.date).format('YYYY-MM-DD') || ''}
                        </Descriptions.Item>
                        <Descriptions.Item label={'Подразделение'}>
                            {item.unit || '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label={'Тип приема'}>
                            {item.type || '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label={'Специлизация'}>
                            {item.specialization || '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label={'Врач'}>
                            {item.doctor || '-'}
                        </Descriptions.Item>

                    </Descriptions>
                </div>
            ))
        }else{
            return null
        }
    }

    return (
        <div className={'person-info-tabs__pane'}>
            {renderPaneList()}
        </div>
    )
}

export default PersonAppointmentsPane
