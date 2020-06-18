import React from 'react'
import './styles.scss'
import {Card} from "antd";
import moment from "moment";
import './styles.scss'

type TooltipProps = {
    fullName: string
    lastChange: Date
}

const PatientRowTooltip: React.FC<TooltipProps> = (props) => {

    const formattedDate = () => {
        return props.lastChange ? moment(props.lastChange).format('YYYY-MM-DD')
            : 'неизвестно'
    }

    return (
        <div className={'patient-tooltip'}>
            <div className="patient-tooltip__item date-item">
                <span className={'tooltip-item'}>дата последнего изменения:</span>
                <span className={'tooltip-value'}>{formattedDate()}</span>
            </div>
            <div className="patient-tooltip__item person-name-item">
                <span className={'tooltip-item'}>ФИО вносившего последние изменения:</span>
                <span className={'tooltip-value'}>{props.fullName ? props.fullName : 'неизвестно'}</span>
            </div>
            <a href={'/'}>Подробнее</a>
        </div>
    )
}

export default PatientRowTooltip
