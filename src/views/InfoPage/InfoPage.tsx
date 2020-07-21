import React, {useEffect} from 'react'
import './styles.scss'
import {Col, Row} from "antd";
import InfoPageTabs from "../../components/tabs/InfoPageTabs/InfoPageTabs";
import TableSearchHeader from "../../components/tables/wrappers/TableSearchHeader/TableSearchHeader";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {fetchInfoBook} from "../../store/infoBook/actions";

const InfoPage: React.FC = (props) => {

    const navigation = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchInfoBook())
    }, [])

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
