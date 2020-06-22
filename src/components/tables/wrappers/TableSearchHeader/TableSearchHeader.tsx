import React, {useEffect, useState} from 'react'
import {CloseOutlined, SlidersOutlined} from "@ant-design/icons/lib";
import './style.scss'
import {Card, Input, Row} from "antd";
import PatientSearchFilterForm from "../../../forms/PatientSearchFilterForm/PatientSearchFilterForm";

type SearchHeaderProps = {
    onChangeQuery: (query: string) => void
    onOpenSearch?(): void
}

const TableSearchHeader: React.FC<SearchHeaderProps> = (props) => {

    const [showSearchForm, setShowForm] = useState(false)


    useEffect(() => {
        if(props.onOpenSearch){
            props.onOpenSearch()
        }
    }, [showSearchForm])


    const renderTableBody = () => {
        if(showSearchForm){
            return <Card>
                <PatientSearchFilterForm/>
            </Card>
        }else if(props.children){
            return props.children
        }else{
            return null
        }
    }

    const renderHeader = () => {
        if(showSearchForm){
            return <div className={'table-top__logo table-top__search'}>
                Расширенный поиск
                <div className="find-filters__wrapper">
                    <CloseOutlined onClick={() => {
                        setShowForm(!showSearchForm)
                    }}/>
                </div>
            </div>
        }else{
            return <>
                <div className={'table-top__logo'}>
                    Пациенты
                    <div className="find-filters__wrapper">
                        <SlidersOutlined onClick={() => {
                            setShowForm(!showSearchForm)
                        }} />
                    </div>
                </div>
                <div className={'table__top-search-wrapper'}>
                    <Input placeholder="Поиск" type={'small'} onChange={e => {
                        props.onChangeQuery(e.target.value)
                    }} />
                </div>
            </>
        }
    }

    return (
        <div>
            <Row  align={'stretch'} >
                {renderHeader()}
            </Row>
            <div>
                {renderTableBody()}
            </div>
        </div>
    )
}

export default TableSearchHeader
