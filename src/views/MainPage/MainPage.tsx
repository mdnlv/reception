import React, {FC, useState} from 'react'
import {Col, Row, Select} from "antd";
import PatientsTable from "../../components/tables/PatientsTable/PatientsTable";
import PatientInfoCard from "../../components/cards/PatientInfoCard/PatientInfoCard";
import './styles.scss'
import TableSearchHeader from "../../components/tables/wrappers/TableSearchHeader/TableSearchHeader";
import moment from "moment";
import TimeTable from "../../components/elements/TimeTable/TimeTable";
import {useSelector, useStore} from "react-redux";
import {RootState} from "../../store/store";
import PatientReceptions from "../../components/modals/PatientReceptions/PatientReceptions";


const MainPage: FC = (props) => {

    const infoBooks = useSelector((state: RootState) => state.infoBooks)
    const [showUserInfo, setShowInfo] = useState(false)

    const handlePatientsQuery = (query: string) => {
        console.log(query)
    }

    const treeProps = {
        'asdasd123123': {
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
                        },
                        '2342423fdsfsd': {
                            title: '342424',
                            unit: 'dsa233',
                            doc: '324',
                        }
                    }
                }
            }
        },
        '234eew3': {
            title: 'asdad',
            unit: 'sadas',
            doc: 'dsadas',
            children: {
                'fds3fds24': {
                    title: 'sad34',
                    unit: 'asd34',
                    doc: '324d',
                    children: {
                        '342423432fdsf': {
                            title: '432999fsd',
                            unit: 'das',
                            doc: '34242'
                        },
                        'dsccc3244332': {
                            title: '342424',
                            unit: 'dsa233',
                            doc: '324',
                        }
                    }
                }
            }
        }
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
                            <TimeTable data={treeProps}/>
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
