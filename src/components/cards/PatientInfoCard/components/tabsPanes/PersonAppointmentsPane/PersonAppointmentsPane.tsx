import React from 'react'
import {Col, Descriptions, List, Row} from "antd";
import PersonAppointment from "../../../../../../types/data/PersonAppointment";
import moment from "moment";
import './styles.scss'

type PaneProps = {
    appointmentsList?: PersonAppointment[]
}

const PersonAppointmentsPane: React.FC<PaneProps> = (props) => {

    const apArray: PersonAppointment[] = []
    for(let i = 0; i < 5; i++){
        apArray.push({
            id: i.toString(),
            date: new Date(),
            type: 'Осмотр',
            specialization: '',
            unit: 'Терапевтическое',
            doctor: 'Александров Александр Александрович'
        })
    }

    const renderPaneList = () => {
        if(apArray.length > 0){
            return apArray.map(item => (
                <Descriptions key={item.id} column={4}>
                    <Descriptions.Item label={'Дата'}>
                        {item.date || '-'}
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
            ))
        }else{
            return null
        }
    }

    return (
        <div className={'person-info-tabs__pane'}>
            {apArray.map(item => (
                <div className={'person-appointments-list__item'}>
                    <Descriptions key={item.id} size={'small'} column={3}>
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
            ))}
        </div>
    )
}

export default PersonAppointmentsPane
