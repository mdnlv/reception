import React, {FC, useCallback, useMemo, useState} from 'react'
import {Card, Table} from "antd";
import PatientInfoCard from "../../cards/PatientInfoCard/PatientInfoCard";
import {SlidersOutlined} from "@ant-design/icons/lib";
import './styles.scss'
import moment from "moment";
import Column from "antd/es/table/Column";
import MouseTooltip from 'react-sticky-mouse-tooltip';
import PatientRowTooltip from "../../tooltips/PatientRowTooltip/PatientRowTooltip";
import Patient from "../../../types/data/Patient";

type TableProps = {
    patients: Patient[]
}


type ToolTipInfo = {
    fullName: string
    lastChange: Date
}

const PatientsTable: FC<TableProps> = (props) => {

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

    const getFormattedProps = useMemo(() => {
        return props.patients.map((item, index) => {
            return {
                ...item,
                key: index,
                birthDate: moment(item.birthDate).format('YYYY-MM-DD'),
                medExamination: moment(item.medExamination).format('YYYY-MM-DD')
            }
        })
    }, [props.patients])

    return (
        <>
            <Table dataSource={getFormattedProps} columns={columns}   onRow={(record) => {
                return {
                    onMouseEnter: event => {
                        event.persist()
                        setIsShowTooltip(true)
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
