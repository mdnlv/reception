import React, {useMemo} from "react";
import {Button, Descriptions, Row, Space} from "antd";
import format from "../../../utils/date/format";

type CardProps = {
    isPast: boolean
    date: Date
    unit: string
    doctor: string
    specialization: string
    type: string
}

const PatientReceptionCard: React.FC<CardProps> = (props) => {

    const wrappedText = (item: string | undefined | null) => {
        if(!item){
            return '-'
        }else{
            return item
        }
    }

    const formattedDate = useMemo(() => {
        if(props.date){
            return format(props.date, 'dd.MM.yyyy')
        }
    }, [props.date])

    const liveReceptionActions = () => {
        return <Space>
            <Button size={'small'} type='primary' danger>
                Отменить
            </Button>
            <Button size={'small'} type='primary' className={'save-btn'}>
                Перенести
            </Button>
        </Space>
    }

    return (
        <div>
            <Row>
                <Descriptions className={'patient-reception-card'} size={'small'} column={3} layout={'vertical'}>
                    <Descriptions.Item label={'Дата'}>
                        {formattedDate}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Подразделение'}>
                        {wrappedText(props.unit)}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Тип приема'}>
                        {wrappedText(props.type)}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Специлизация'}>
                        {wrappedText(props.specialization)}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Врач'}>
                        {wrappedText(props.doctor)}
                    </Descriptions.Item>
                </Descriptions>
            </Row>
            {props.isPast && <Row className={'patient-reception-card__actions'} justify={'end'}>
                {liveReceptionActions()}
            </Row>}
        </div>
    )
}

export default PatientReceptionCard
