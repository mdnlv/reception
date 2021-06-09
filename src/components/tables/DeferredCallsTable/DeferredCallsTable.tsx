import React, {useState} from 'react'
import TableSearchHeader from "../wrappers/TableSearchHeader/TableSearchHeader";
import {Table, Button} from "antd";
import  styled from 'styled-components';

import JosAppointment from '../../modals/JosAppointment/JosAppointment'
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



    console.log(data)


    const [isOpenModal, setOpenModal] = useState(false)


    const WrapButton = styled.div`
    margin: 0.5rem  0;

`  
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
        <>
        <TableSearchHeader  title={'ЖОС'} onTableModeChange={() => {}} mode={'default'}>
            <WrapButton>
            <Button onClick={()=>setOpenModal(true)} >Записаться на примем</Button>
            </WrapButton>
            <Table
                loading={isLoading}
                dataSource={data}
                columns={columns}>
            </Table>
        </TableSearchHeader>
            <JosAppointment 
            isVisible={isOpenModal}
            onClose={() => setOpenModal(false)}
            />
        </>
    )
}

export default DeferredCallsTable
