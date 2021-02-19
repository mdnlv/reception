import React, { FC, useCallback, useState } from 'react';
import { Avatar, Button, Col, Row, Space } from 'antd/lib';
import { useHistory } from 'react-router-dom';

import Logo from '../../../assets/icons/app-logo.svg';
import ExitIcon from '../../../assets/icons/exit.svg';
import './styles.scss';

import NewAppointment from '../../modals/NewAppointment/NewAppointment';

const BarLogoAlt = 'Logo';

enum Labels {
  Print = 'Печать',
  Journal = 'ЖОС',
  K = 'Кэр',
  Appointment = 'Записать на прием',
  NewPatient = 'Новый пациент',
  Info = 'Справка',
}

const AppHeaderBar: FC = () => {
  const navigation = useHistory();
  const [showNewAppointment, setShowAppointment] = useState(false);

  const logoClickHandler = useCallback(() => {
    navigation.push('/');
  }, []);

  const showAppointment = useCallback(() => {
    setShowAppointment(!showNewAppointment);
  }, []);

  const goPath = (path: string) => {
    navigation.push('/' + path);
  };

  const onNewPatientClick = useCallback(() => {
    goPath('regCard/new');
  }, []);

  const onInfoClick = useCallback(() => {
    goPath('info');
  }, []);

  return (
    <Row align="stretch">
      <Col md={20} xs={24}>
        <Row>
          <Col className="header__logo" onClick={logoClickHandler}>
            <img src={Logo} alt={BarLogoAlt} className="app-logo" />
          </Col>
          <Col>
            <Space>
              <Button size={'small'} className="header__button">
                {Labels.Print}
              </Button>
              <Button size={'small'} className="header__button">
                {Labels.K}
              </Button>
              <Button size={'small'} onClick={() => goPath('deferred-calls')} className="header__button">
                {Labels.Journal}
              </Button>
              {/* <Button
                size={'small'}
                className="header__button"
                onClick={showAppointment}>
                {Labels.Appointment}
              </Button> */}
              <Button
                onClick={onNewPatientClick}
                size={'small'}
                className="header__button">
                {Labels.NewPatient}
              </Button>
              <Button
                size={'small'}
                className="header__button"
                onClick={onInfoClick}>
                {Labels.Info}
              </Button>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col md={4} xs={24}>
        <Row>
          <Col span={20} md={20} xs={24}>
            <div className="header__user-block">
              <Avatar>Б</Avatar>
              <span className="block-name">Б.А. Куприянов</span>
            </div>
          </Col>
          <Col span={4} md={4} xs={24}>
            <Row justify={'end'} align={'middle'}>
              <Col>
                <img src={ExitIcon} alt="" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <NewAppointment
        isVisible={showNewAppointment}
        onClose={() => setShowAppointment(false)}
      />
    </Row>
  );
};

export default AppHeaderBar;
