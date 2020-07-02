import React from 'react'
import './styles.scss'
import {Col, Row} from "antd";
import InfoPageTabs from "../../components/tabs/InfoPageTabs/InfoPageTabs";
import TableSearchHeader from "../../components/tables/wrappers/TableSearchHeader/TableSearchHeader";
import {useHistory} from "react-router";

const InfoPage: React.FC = (props) => {

    const navigation = useHistory()

    const goToMain = () => {
        navigation.push('/')
    }

    return (
        <Row className={'info-page'}>
            <Col span={24}>
                <TableSearchHeader title={'Справочная информация'} onCloseClick={goToMain} onChangeQuery={() => {}}>
                    <InfoPageTabs/>
                </TableSearchHeader>
            </Col>
        </Row>
    )
}

export default InfoPage
