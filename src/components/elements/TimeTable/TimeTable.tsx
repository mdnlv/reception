import React from 'react'
import {Card, Col, Row} from "antd";
import TreeList from "./components/TreeList/TreeList";

const TimeTable: React.FC = (props) => {

    const treeProps = {
        title: 'asdad',
        unit: 'sadas',
        doc: 'dsadas',
        children: {
            'sadasd': {
                title: 'sad34',
                unit: 'asd34',
                doc: '324d',
                children: {
                    'asd34322': {
                        title: '432999fsd',
                        unit: 'das',
                        doc: '34242'
                    }
                }
            }
        }
    }

    return (
        <Card
            size={'small'}
        >
            <Row>
                <Col span={6}>
                    <TreeList data={treeProps}/>
                </Col>
                <Col span={18}>

                </Col>
            </Row>
        </Card>
    )
}

export default TimeTable
