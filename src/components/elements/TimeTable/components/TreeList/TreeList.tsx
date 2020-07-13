import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Divider} from "antd";
import './styles.scss'
import SelectNode from "./components/SelectNode/SelectNode";
import {PlaceItem, SelectedPlaceItem} from "../../types";

interface ListProps {
    data: {[k: string]: PlaceItem}
    delta?: number
    type: 'day' | 'week'
}

const TreeList: React.FC<ListProps> = (props) => {

    const [rowKeys, setRowKeys] = useState<string[]>([] as string[])
    const [listData, setListData] = useState<{[k: string]: SelectedPlaceItem}>()
    let firstNode: string | null = null


    useEffect(() => {
        setListData(props.data)
    }, [props.data])

    const selectKeyNode = useCallback((key: string) => {
        setRowKeys(oldValue => {
            if(oldValue.find((item) => item === key)){
                return oldValue.filter(item => item !==  key)
            }
            return [...oldValue, key]
        })

    }, [rowKeys])

    const getTreeBody = (tree: { [k: string] : SelectedPlaceItem }) => {
        const returnArr = []
        for(let [key, value] of Object.entries(tree)){
            if(firstNode === null) firstNode = key
            if(value.children){
                let selected=false
                const isFirstNode = firstNode === key
                if(rowKeys.find(item => item === key)) {
                    selected = true
                }
                returnArr.push(<div key={key} className={`tree-node tree-select`}>
                        <SelectNode
                            type={props.type}
                            id={key}
                            title={value.title}
                            selected={selected}
                            doc={value.doc}
                            unit={value.unit}
                            isFirstNode={isFirstNode}
                            selectNode={() => {
                                selectKeyNode(key)
                            }}
                            delta={props.delta}
                            docSpecialization={'asd'}/>
                        <Divider />
                        {
                            selected && <div className="tree-node__content">
                                { getTreeBody(value.children)}
                            </div>
                        }
                    </div>)
            }else{
                let selected = false
                if(rowKeys.find(item => item === key)) selected = true
                returnArr.push(<div key={key} className={'tree-node'}>
                    <SelectNode type={props.type} id={key} selected={selected} title={value.title} selectNode={() => {
                        selectKeyNode(key)
                    }} unit={value.unit} doc={value.doc} docSpecialization={'fds'}/>
                    <Divider/>
                </div>)
            }
        }

        return returnArr
    }

    const treeListBody = useMemo(() => {
        if(listData){
            return getTreeBody(listData)
        }else{
            return null
        }
    }, [rowKeys, listData, props.delta, props.type])

    return (
        <div className={'tree-list'}>
            {treeListBody}
        </div>
    )
}

export default TreeList
