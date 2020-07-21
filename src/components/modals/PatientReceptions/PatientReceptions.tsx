import React, {useMemo, useState} from 'react'
import {Col, Divider, Input, Modal, Row, Tabs} from "antd";
import PersonAppointment from "../../../types/data/PersonAppointment";
import _ from 'lodash'
import PatientReceptionCard from "../../cards/PatientReceptionCard/PatientReceptionCard";
import './styles.scss'
import {isPast} from "date-fns";

type PatientReceptionsProps = {
    onClose?(): void
    isVisible: boolean
    title: string
    receptions: PersonAppointment[]
}

const PatientReceptions: React.FC<PatientReceptionsProps> = (props) => {

    const [activeTab, setActiveTab] = useState('all')

    const passedReceptions = useMemo(() => {
        return props.receptions.filter(item => isPast(item.date))
    }, [props.receptions])

    const futureReceptions = useMemo(() => {
        return props.receptions.filter(item => !isPast(item.date))
    }, [props.receptions])

    const getReceptionsGrid = useMemo(() => {
        let chunkArr = [] as PersonAppointment[]
        switch (activeTab) {
            case 'past':
                chunkArr = passedReceptions
                break
            case 'future':
                chunkArr = futureReceptions
                break
            default:
                chunkArr = props.receptions
        }
        const chunkReceptions = _.chunk<PersonAppointment>(chunkArr, 2)
        return <div className={'patient-receptions-grid'}>
            {chunkReceptions.map((group, index) => {
                return <>
                    <Row key={index} gutter={8}>
                        {group[0] && <Col span={12}>
                            <PatientReceptionCard isPast={true} {...group[0]}/>
                        </Col>}
                        {group[1] && <Col span={12}>
                            <PatientReceptionCard isPast={true} {...group[1]}/>
                        </Col>}
                    </Row>
                    <Divider/>
                </>
            })}
        </div>
    }, [activeTab, props.receptions])

    return (
        <Modal
            width={720}
            className={'patient-receptions-modal'}
            wrapClassName={'app-modal'}
            visible={props.isVisible}
            title={props.title}
            footer={null}
        >
            //@ts-ignore(ant-d props error)
            <Tabs centered={true} onChange={key => {
                console.log(key)
                setActiveTab(key)
            }}>
                <Row>
                    <Input/>
                </Row>
                <Tabs.TabPane key={'all'} tab={'Все приемы'}>
                    {getReceptionsGrid}
                </Tabs.TabPane>
                <Tabs.TabPane key={'past'} tab={'Прошедшие приемы'}>
                    {getReceptionsGrid}
                </Tabs.TabPane>
                <Tabs.TabPane key={'future'} tab={'Будущие приемы'}>
                    {getReceptionsGrid}
                </Tabs.TabPane>
            </Tabs>
        </Modal>
    )
}

export default PatientReceptions
