import React from 'react'
import TableSearchHeader from "../wrappers/TableSearchHeader/TableSearchHeader";
import {Table} from "antd";

interface DeferredCallsTableProps {
    data: {
        key: number
        fullName: string
        person: string
        org: string
        netrica: string | number | null
        contact: string
    }[]
    isLoading: boolean
}

const DeferredCallsTable: React.FC<DeferredCallsTableProps> = ({data, isLoading}) => {

    const columns = [
        {
            title: 'ФИО',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Врач',
            dataIndex: 'person',
            key: 'person',
        },
        {
            title: 'Организация',
            dataIndex: 'org',
            key: 'org',
        },
        {
            title: 'Отделение',
            dataIndex: 'netrica',
            key: 'netrica',
        },
        {
            title: 'Контакты',
            dataIndex: 'contact',
            key: 'contact',
        },
    ]

    return (
        <TableSearchHeader title={'ЖОС'} onTableModeChange={() => {}} mode={'default'}>
            <Table
                loading={isLoading}
                dataSource={data}
                columns={columns}
            >

            </Table>
        </TableSearchHeader>
    )
}

export default DeferredCallsTable
