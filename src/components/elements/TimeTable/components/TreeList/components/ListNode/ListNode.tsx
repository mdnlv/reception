import React from 'react'
import './styles.scss'

type NodeProps = {
    title: string
    unit: string
    doc: string
    docSpecialization: string
}

const ListNode: React.FC<NodeProps> = (props) => {
    return (
        <div className={'list-node'}>
            <h4 className="list-node__title">
                {props.title}
            </h4>
            <div className="list-node__content">
                <div className="list-node__content-item">
                    {props.doc}
                </div>
                <div className="list-node__content-item">
                    {props.unit}
                </div>
                <div className="list-node__content-item">
                    {props.docSpecialization}
                </div>
            </div>
        </div>
    )
}

export default ListNode
