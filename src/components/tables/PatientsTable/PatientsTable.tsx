import React, {FC, useState} from 'react'
import {Card, Table} from "antd";
import PatientInfoCard from "../../cards/PatientInfoCard/PatientInfoCard";
import {SlidersOutlined} from "@ant-design/icons/lib";
import './styles.scss'
import moment from "moment";
import Column from "antd/es/table/Column";
import MouseTooltip from 'react-sticky-mouse-tooltip';
import PatientRowTooltip from "../../tooltips/PatientRowTooltip/PatientRowTooltip";


type MouseCoords = {
    x: number
    y: number
}

type ToolTipInfo = {
    fullName: string
    lastChange: Date
}

const PatientsTable: FC = (props) => {

    const [mouseCoords, setMouseCoords] = useState<MouseCoords>({x:0, y:0})
    const [isShowTooltip, setIsShowTooltip] = useState(false)
    const [tooltipInfo, setTooltipInfo] = useState<ToolTipInfo>({
        fullName: '',
        lastChange: new Date()
    })

    const columns = [
        {
            title: 'ФИО',
            dataIndex: 'fullName',
            key: 'fullName'
        },
        {
            title: 'Дата рождения',
            dataIndex: 'birthDate',
            key: 'birthDate'
        },
        {
            title: 'Пол',
            dataIndex: 'sex',
            key: 'sex'
        },
        {
            title: 'СНИЛС',
            dataIndex: 'snils',
            key: 'snils'
        },
        {
            title: 'С',
            dataIndex: 'cNumber',
            key: 'cNumber'
        },
        {
            title: 'К',
            dataIndex: 'kNumber',
            key: 'kNumber'
        },
        {
            title: 'Адрес',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Вид наблюдения',
            dataIndex: 'viewType',
            key: 'viewType'
        }
    ]
    const dataSource = [
        {
            key: 1,
            fullName: 'Test test test',
            birthDate: moment(new Date()).format("YYYY-MM-DD"),
            sex: 'М',
            snils: '213-312321-312',
            cNumber: '132123123123',
            kNumber: '213e123123,',
            address: 'Санкт-Петербург,\n' +
                'Революции ш.д.18 кв.1',
            viewType: 'амбуларно'

        },
        {
            key: 2,
            fullName: 'Test test test 1',
            birthDate: moment(new Date()).format("YYYY-MM-DD"),
            sex: 'М',
            snils: '213-312321-312',
            cNumber: '132123123123',
            kNumber: '213e123123,',
            address: 'Санкт-Петербург,\n' +
                'Революции ш.д.18 кв.1',
            viewType: 'амбуларно'

        }
    ]

    return (
        <>
            <Table dataSource={dataSource} columns={columns}   onRow={(record) => {
                return {
                    onMouseEnter: event => {
                        event.persist()
                        setIsShowTooltip(true)
                        setMouseCoords({x: event.pageX , y: event.pageY})
                        setTooltipInfo({
                            fullName: record.fullName,
                            lastChange: new Date()
                        })
                    },
                    onMouseLeave: event => {
                        event.persist()
                        setIsShowTooltip(false)
                    }

                }

            }}/>
            <MouseTooltip
                visible={isShowTooltip}
                offsetX={10}
                offsetY={5}
                className={'patients-table-tooltip'}
            >
                <PatientRowTooltip fullName={tooltipInfo.fullName} lastChange={tooltipInfo.lastChange}/>
            </MouseTooltip>
        </>
    )
}

export default PatientsTable
