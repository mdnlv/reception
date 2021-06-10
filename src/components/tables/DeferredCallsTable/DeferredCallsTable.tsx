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
        code: number
        org: string
        createdDate: string,
        netrica: string | number | null
        contact: string,
        comment: string,
        maxDate: string,
        birthday?: string,
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
            title: 'Дата создания',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Код',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Номер заявки',
            dataIndex: 'netrica',
            key: 'netrica',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
        },
        {
            
            title: 'ФИО пациента',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Возраст',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: 'Подразделение',
            dataIndex: 'org',
            key: 'org',
        },
        {
            title: 'Специальность',
            dataIndex: 'specialty',
            key: 'specialty',
        },
        {
            title: 'Врач',
            dataIndex: 'person',
            key: 'person',
        },
       
        {
            title: 'Максимальная дата',
            dataIndex: 'maxDate',
            key: 'maxDate',
        },
        {
            title: 'комментарий',
            dataIndex: 'comment',
            key: 'comment',
        },
    ]

    return (
        <>
        <TableSearchHeader  title={'ЖОС'} onTableModeChange={() => {}} mode={'default'}>
            <WrapButton>
            <Button onClick={()=>setOpenModal(true)} >Добавить</Button>
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
