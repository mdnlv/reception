import React, {useState} from 'react'
import {Card, Col, Row} from "antd";
import TreeList from "./components/TreeList/TreeList";
import TableHeader from "./components/TableHeader/TableHeader";
import TableHeaderTime from "./components/TableHeaderTime/TableHeaderTime";
import {PlaceItem} from "./types";

type TableProps = {
    onRowItemClick?: (id: string) => void
    data: {
        [k: string]: PlaceItem
    }
}

const TimeTable: React.FC<TableProps> = (props) => {

    const [tableShowType, setTableShowType] = useState<'day' | 'week'>('day')
    const [delta, setDelta] = useState(0)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [startWeek, setStartWeek] = useState(new Date(2020, 6, 4))
    const [endWeek, setEndWeek] = useState(new Date(2020, 6, 13))

    return (
        <Card
            size={'small'}
        >
            <Row>
                <Col span={24}>
                    <TableHeader type={tableShowType} date={currentDate} startWeek={startWeek} endWeek={endWeek} onTypeChange={(type) => {
                        setTableShowType(type)
                    }}/>
                </Col>
            </Row>
            <Row >
                <Col span={23}>
                    <Row justify={'end'}>
                        <TableHeaderTime type={tableShowType} startWeek={startWeek}/>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={23}>
                    <TreeList type={tableShowType} delta={delta} data={props.data}/>
                </Col>
            </Row>
        </Card>
    )
}

export default TimeTable
