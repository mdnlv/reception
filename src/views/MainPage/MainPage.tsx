import React, {FC, useState} from 'react'
import {Col, Row} from "antd";
import PatientsTable from "../../components/tables/PatientsTable/PatientsTable";
import PatientInfoCard from "../../components/cards/PatientInfoCard/PatientInfoCard";
import './styles.scss'
import TableSearchHeader from "../../components/tables/wrappers/TableSearchHeader/TableSearchHeader";
import moment from "moment";
import TimeTable from "../../components/elements/TimeTable/TimeTable";

const MainPage: FC = (props) => {

    const [showUserInfo, setShowInfo] = useState(false)
    const handlePatientsQuery = (query: string) => {
        console.log(query)
    }

    const dataSource = [
        {
            id: 1,
            fullName: 'Test test test',
            birthDate: moment(new Date()).toDate(),
            sex: 'М',
            snils: '213-312321-312',
            cNumber: '132123123123',
            kNumber: '213e123123,',
            address: 'Санкт-Петербург,\n' +
                'Революции ш.д.18 кв.1',
            viewType: 'амбуларно',
            code: '213',
            quotes: [],
            medicalAttachment: 'asdas34',
            regAddress: '',
            livingAddress: '',
            doc: '',
            policyOMC: '',
            medExamination: moment(new Date()).toDate()

        },
    ]

    return (
        <Row className={'main-page'}>
            <Col span={showUserInfo ? 17 : 24} className={'main-page__tables'}>
                <Row>
                    <Col span={24}>
                        <TableSearchHeader title={'Пациенты'} type={'filter'} onOpenSearch={() => {
                            setShowInfo(!showUserInfo)
                        }} onChangeQuery={handlePatientsQuery}>
                            <PatientsTable patients={dataSource}/>
                        </TableSearchHeader>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} >
                        <TableSearchHeader className={'docs-search-table'} title={'Врачи'} type={'filter'} onOpenSearch={() => {
                            setShowInfo(!showUserInfo)
                        }} onChangeQuery={() => {}}>
                            <TimeTable/>
                        </TableSearchHeader>
                    </Col>
                </Row>
            </Col>
            {showUserInfo && <Col span={7}>
                <PatientInfoCard/>
            </Col>}
        </Row>
    )
}

export default MainPage
