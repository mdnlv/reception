import React from 'react'
import Patient from "../../../../../../types/data/Patient";
import {Descriptions, List} from "antd";
import './styles.scss'

type PaneProps = {
    patient?: Partial<Patient>
}

const PersonInfoPane: React.FC<PaneProps> = (props) => {

    const labelArr = [
        'ФИО',
        'Дата рождения',
        'Код',
        'Квоты',
        'Прикрепления',
        'Документ',
        'Полис ОМС',
        'Адрес\n' +
        'регистрации',
        'Адрес\n' +
        'проживания',
        'Занятость',
        'Телефоны',
        'Место\n' +
        'рождения',
        'Примечания',
        'Дата \n' +
        'подтверждения ЕИС',
        'Дата \n' +
        'регистрации в МИС',
        'Диспансеризация'
    ]
    const valuesArr = props.patient ? Object.values(props.patient) : []

    const renderListBody = () => {
        if(labelArr && valuesArr){
            return labelArr.map((item, index) => (
                <Descriptions.Item key={index} label={item}>
                    {valuesArr[index] || '-'}
                </Descriptions.Item>
            ))
        }
    }

    return (
        <div className={'person-info-tabs__pane person-info-pane'}>
            <Descriptions column={1}>
                {renderListBody()}
            </Descriptions>
        </div>
    )
}

export default PersonInfoPane
