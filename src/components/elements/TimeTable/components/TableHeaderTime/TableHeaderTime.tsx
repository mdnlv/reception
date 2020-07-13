import React, {useMemo} from 'react'
import {Row} from "antd";
import './styles.scss'
import {addDays, format} from "date-fns";
import moment from "moment";

type HeaderTimeProps = {
    type: 'day' | 'week'
    startWeek: Date
}

const TableHeaderTime: React.FC<HeaderTimeProps> = (props) => {

    const generateTimeLine = () => {
        const startHour = 8.00
        const endHour = 18.00

        const timeLines = []

        for(let i = startHour, k = 0; i <= endHour; i+=0.25, k+= 1){
            timeLines.push(
                <li key={i} className={'header-timeline__item header-timeline__item--time'}>
                    {(i % 0.50 === 1 || i % 0.50 === 0) &&  <span className={'timeline-time'}>
                        {`${Math.floor(i) < 10 ? `0${Math.floor(i)}` : Math.floor(i)}:${i - Math.floor(i) === 0.50 ? '30' : '00'}`}
                    </span>}
                </li>
            )
        }


        return <ul className={'header-timeline'}>
            {timeLines}
        </ul>
    }

    const checkHoliday = (dayName: string) => {
        if(dayName === 'сб' || dayName === 'вс'){
            return true
        }
    }

    const generateWeekLine = () => {
        const startDate = props.startWeek

        const timelines = []
        let prevDate = startDate
        for(let i = 0; i < 14; i++){
            const newDate = addDays(prevDate, 1)
            const dateDayName = moment(newDate).format('ddd')
            const isHoliday = checkHoliday(dateDayName)
            timelines.push(<li key={i} className={'header-timeline__item header-timeline__item--week'}>
                <span className={`timeline-time ${isHoliday ? 'timeline-time--holiday' : ''}`}>
                    <div>
                        {format(newDate, 'dd.MM')}
                    </div>
                    <div>
                        {dateDayName}
                    </div>
                </span>
            </li>)
            prevDate = newDate
        }

        return <ul className={'header-timeline'}>
            {timelines}
        </ul>
    }

    const listBody = useMemo(() => {
        if(props.type === 'day'){
            return generateTimeLine()
        }else{
            return generateWeekLine()
        }
    }, [props.type])

    return (
        <Row>
            {listBody}
        </Row>
    )
}

export default TableHeaderTime
