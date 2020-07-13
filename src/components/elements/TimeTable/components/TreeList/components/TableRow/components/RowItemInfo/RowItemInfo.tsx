import React from 'react'
import {Card, Descriptions} from "antd";
import './styles.scss'

type InfoProps = {
    patient: string
    service: string
    addInfo: string
}

const RowItemInfo: React.FC<InfoProps> = (props) => {
    return (
        <Descriptions className={'row-item-info'} column={2} layout={'vertical'}>
            <Descriptions.Item className={'row-item-info__patient'} label="пациент">{props.patient}</Descriptions.Item>
            <Descriptions.Item className={'row-item-info__service'} label="услуга">{props.service}</Descriptions.Item>
            <Descriptions.Item className={'row-item-info__addInfo'} label="дополнительно">{props.addInfo}</Descriptions.Item>
        </Descriptions>
    )
}

export default RowItemInfo
