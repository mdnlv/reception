import React, {FC} from 'react'
import {Col, Row} from "antd";
import PatientsTable from "../../components/tables/PatientsTable/PatientsTable";
import PatientInfoCard from "../../components/cards/PatientInfoCard/PatientInfoCard";
import './styles.scss'
import TableSearchHeader from "../../components/tables/wrappers/TableSearchHeader/TableSearchHeader";

const MainPage: FC = (props) => {

    const handlePatientsQuery = (query: string) => {
        console.log(query)
    }

    return (
        <Row className={'main-page'}>
            <Col span={17} className={'main-page__tables'}>
                <TableSearchHeader onChangeQuery={handlePatientsQuery}>
                    <PatientsTable/>
                </TableSearchHeader>
            </Col>
            <Col  span={7}>
                <PatientInfoCard/>
            </Col>
        </Row>
    )
}

export default MainPage
