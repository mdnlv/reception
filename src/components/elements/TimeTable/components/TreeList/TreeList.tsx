import React, {useEffect, useMemo} from 'react'
import {Input, Tree} from "antd";
import ListNode from "./components/ListNode/ListNode";

interface PlaceItem {
    doc: string
    title: string
    unit: string
    children?: {
        [k: string]: PlaceItem
    }
}

interface ListProps {
    data: PlaceItem
}

interface TreeListNode  {
    title: React.ReactNode
    key: string
    children?: TreeListNode[]
}


const TreeList: React.FC<ListProps> = (props) => {

    const generateTreeArr = (tree: PlaceItem) => {
        const arrResponse: TreeListNode = {
            title: <ListNode title={tree.title} doc={tree.doc} unit={tree.unit} docSpecialization={'test'} />,
            key: tree.title,
            children: []
        }
        if(tree.children){
            const entities = Object.entries(tree.children)
            for(let [_, value] of entities){
                const getArr = generateTreeArr(value)
                arrResponse.children?.push(getArr)
            }
        }

        return arrResponse
    }

    const formattedTree = useMemo(() => {
        return [generateTreeArr(props.data)]
    }, [props.data])

    return (
        <Tree
            treeData={formattedTree}
        >
        </Tree>
    )
}

export default TreeList
