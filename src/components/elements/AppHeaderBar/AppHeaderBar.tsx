import React, {FC, useState} from 'react'
import {Avatar, Button, Col, Row, Space, Typography} from 'antd'
import Logo from '../../../assets/icons/app-logo.svg'
import ExitIcon from '../../../assets/icons/exit.svg'
import './styles.scss'
import { useHistory } from "react-router-dom"
import NewAppointment from "../../modals/NewAppointment/NewAppointment";


const AppHeaderBar: FC = (props) => {

    const navigation = useHistory()
    const [showNewAppointment, setShowAppointment] = useState(false)

    const logoClickHandler = (e: React.SyntheticEvent<EventTarget>) => {
        navigation.push("/")
    }

    const showAppointment = (e?: React.SyntheticEvent<EventTarget>) => {
        setShowAppointment(!showNewAppointment)
    }

    return (
        <Row align="stretch">
            <Col md={20} xs={24} >
                <Row>
                    <Col className="header__logo" onClick={logoClickHandler}>
                        <img src={Logo} className='app-logo'/>
                    </Col>
                    <Col>
                        <Space>
                            <Button className="header__button">
                                Печать
                            </Button>
                            <Button className="header__button">
                                КЭР
                            </Button>
                            <Button className="header__button">
                                ЖОС
                            </Button>
                            <Button className="header__button" onClick={showAppointment}>
                                Записать на прием
                            </Button>
                            <Button className="header__button" onClick={() => {
                                navigation.push('/regcard')
                            }}>
                                Регистрационная карточка
                            </Button>
                            <Button className="header__button">
                                Новый пациент
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Col>
            <Col md={4} xs={24}>
                <Row>
                    <Col
                        span={20}
                        md={20}
                        xs={24}
                    >
                        <div className="header__user-block">
                            <Avatar>Б</Avatar>
                            <span className="block-name">Б.А. Куприянов</span>
                        </div>
                    </Col>
                    <Col
                        span={4}
                        md={4}
                        xs={24}
                    >
                        <Row justify={'end'} align={'middle'}>
                            <Col>
                                <img src={ExitIcon} alt=""/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <NewAppointment isVisible={showNewAppointment} onClose={showAppointment}/>
        </Row>
    )
}

export default AppHeaderBar
