import React from 'react'
import {SlidersOutlined} from "@ant-design/icons/lib";
import './style.scss'
import {Input, Row} from "antd";

type SearchHeaderProps = {
    onChangeQuery: (query: string) => void
}

const TableSearchHeader: React.FC<SearchHeaderProps> = (props) => {
    return (
        <div>
            <Row  align={'stretch'} >
                <div className={'table-top__logo'}>
                    Пациенты
                    <SlidersOutlined />
                </div>
                <div className={'table__top-search-wrapper'}>
                    <Input placeholder="Поиск" type={'small'} onChange={e => {
                        props.onChangeQuery(e.target.value)
                    }} />
                </div>
            </Row>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default TableSearchHeader
