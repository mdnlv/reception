import React, {useMemo} from 'react'
import {isSameMonth, getWeekOfMonth} from 'date-fns'
import {Radio, Row} from "antd";
import RadioGroup from "antd/es/radio/group";
import './styles.scss'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import {getPluralizeName} from "../../../../../utils/date/pluralizeMonth";
import moment from "moment";

type HeaderProps = {
    type: 'day' | 'week'
    onTypeChange(type: 'day' | 'week'): void
    date?: Date
    startWeek?: Date
    endWeek?: Date
}

const TableHeader: React.FC<HeaderProps> = (props) => {

    const getDateNumber = (date: Date) => {
        return `${moment(date).format('d')} ${getPluralizeName(moment(date).format('MMMM'))}`
    }

    const getWeeksNumber = (startDate: Date, endDate: Date) => {
        if(isSameMonth(startDate, endDate)){
            const monthName = getPluralizeName(moment(startDate).format('MMMM'))
            return `${getWeekOfMonth(startDate)}-${getWeekOfMonth(endDate)} недели
             ${monthName?.charAt(0).toUpperCase().concat(monthName.slice(1))}`
        }else{
            const firstName = getPluralizeName(moment(startDate).format('MMMM'))
            const secondName = getPluralizeName(moment(endDate).format('MMMM'))

            return `${getWeekOfMonth(startDate)} неделя ${firstName} - ${getWeekOfMonth(endDate)} неделя ${secondName}`
        }

    }

    const headerTitle = useMemo(() => {
        if(props.type === 'day' && props.date){
            return getDateNumber(props.date)
        }else if(props.type === 'week' && props.startWeek && props.endWeek){
            return getWeeksNumber(props.startWeek, props.endWeek)
        }
    }, [props])


    return (
        <Row align={'middle'} className={'app-timetable__header'} justify={'space-between'}>
            <Row align={'middle'} justify={'center'} className={'timetable-date-picker'}>
                <div className="timetable-date-picker__back timetable-date-picker__action">
                    <ArrowLeftOutlined />
                </div>
                <div className="timetable-date-picker__date">
                    {headerTitle}
                </div>
                <div className="timetable-date-picker__next timetable-date-picker__action">
                    <ArrowRightOutlined />
                </div>
            </Row>
            <RadioGroup defaultValue={props.type} onChange={typeValue => {
                type HeaderType = 'day' | 'week'
                props.onTypeChange(typeValue.target.value as HeaderType)
            }}>
                <Radio value={'day'}>
                    День
                </Radio>
                <Radio value={'week'}>
                    Недели
                </Radio>
            </RadioGroup>
        </Row>
    )
}

export default TableHeader
