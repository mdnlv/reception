import React, {useMemo} from 'react'
import {Row} from "antd";
import RowItemCard from "./components/RowItemCard/RowItemCard";
import './styles.scss'
import RowItemInfo from "./components/RowItemInfo/RowItemInfo";
import {PlaceItemEvent} from "../../../../types";

type RowProps = {
    type: 'day' | 'week'
    className?: string
    delta?: number
    events?: PlaceItemEvent[]
}

const TableRow: React.FC<RowProps> = (props) => {

    const rowItems = useMemo(() => {
        const returnArr = []
        const typeArr = ['opened', 'closed', 'non-time'] as ['opened', 'closed', 'non-time']
        for(let i = 8.00; i < 18.00; i+=0.25){
            const type = Math.floor(Math.random() * 3)
            returnArr.push(
                <RowItemCard
                    key={i}
                    isPopover={typeArr[type] === 'closed'}
                    showType={props.type}
                    popoverContent={<RowItemInfo patient={'yredt'} service={'yrry'} addInfo={'yryr'}/>}
                    type={typeArr[type]}/>)
        }
        return returnArr
    }, [props.type])

    const getWeekRow = () => {
        const returnArr = []
        const typeArr = ['opened', 'closed', 'non-time'] as ['opened', 'closed', 'non-time']

        for(let i = 0; i < 14; i++){
            const type = Math.floor(Math.random() * 3)
            returnArr.push(
                <RowItemCard
                    key={i}
                    isPopover={typeArr[type] === 'closed'}
                    showType={props.type}
                    popoverContent={<RowItemInfo patient={'yredt'} service={'yrry'} addInfo={'yryr'}/>}
                    type={typeArr[type]}/>)
        }
        return returnArr
    }

    const rowBody = useMemo(() => {
        if(props.type === 'day'){
            return rowItems
        }else {
            return getWeekRow()
        }
    }, [props.type])

    return (
        <Row className={`table-row ${props.className ? props.className : ''}`}>
            <div className="table-row__content" style={{left: props.delta ? props.delta : 0}}>
                {rowBody}
            </div>
        </Row>
    )
}

export default TableRow
