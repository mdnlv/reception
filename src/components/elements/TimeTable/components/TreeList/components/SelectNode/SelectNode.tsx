import React, {SyntheticEvent, useCallback, useMemo} from 'react'
import {PlusSquareOutlined, MinusSquareOutlined} from "@ant-design/icons/lib";
import {Row} from "antd";
import './styles.scss'
import TableRow from "../TableRow/TableRow";
import {PlaceItemEvent} from "../../../../types";

type NodeProps = {
    selectNode?(key: string): void
    title: string
    id: string
    selected: boolean
    doc: string
    unit: string
    docSpecialization: string
    isFirstNode?: boolean
    delta?: number
    events?: PlaceItemEvent[]
    type: 'day' | 'week'
}

const SelectNode: React.FC<NodeProps> = (props) => {

    const isFirstNodeClass = props.isFirstNode ? 'table-row--first' : ''

    const clickHandler = useCallback((e: SyntheticEvent) => {
        if(props.selectNode){
            props.selectNode(props.id)
        }
    }, [props.id])

    const titleIcon = useMemo(() => {
        if(!props.selected){
            return <PlusSquareOutlined className={'select-node__icon'} size={12} onClick={clickHandler} />
        }else{
            return <MinusSquareOutlined className={'select-node__icon'} size={12} onClick={clickHandler}/>
        }
    }, [props.selected])

    return (
        <div className={'select-node'}>
            <Row align={'stretch'} justify={'space-between'}>
                <div>
                    <Row align={'middle'}>
                        {titleIcon}
                        <h4 className={'select-node__title  '}>{props.title}</h4>
                    </Row>
                    {props.selected && <Row align={'stretch'} justify={'space-between'}>
                        <div className="list-node__content ">
                            <div className="list-node__content-item doc-item ">
                                {props.doc}
                            </div>
                            <div className="list-node__content-item">
                                {props.unit}
                            </div>
                            <div className="list-node__content-item">
                                {props.docSpecialization}
                            </div>
                        </div>
                    </Row>}
                </div>
                {props.selected && <TableRow events={props.events} delta={props.delta} className={`${isFirstNodeClass}`} type={props.type}/>}
            </Row>
        </div>
    )
}

export default SelectNode
