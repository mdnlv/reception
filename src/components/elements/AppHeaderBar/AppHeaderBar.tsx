import React, { FC, useCallback, useState, useEffect } from 'react';
import { Avatar, Button, Col, Row, Space } from 'antd/lib';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';
import moment from 'moment';

import { currentPatientInfoSelector } from '../../../reduxStore/slices/patients/selectors';
import {RootState} from "../../../reduxStore/store";
import Logo from '../../../assets/icons/app-logo.svg';
import ExitIcon from '../../../assets/icons/exit.svg';
import './styles.scss';
import {actionTicket} from "../../../reduxStore/slices/scheduleSlice/scheduleSlice";
import { ActionPost } from '../Schedule/types';
import {logout} from "../../../reduxStore/slices/auth/authSlice";

import NewAppointment from '../../modals/NewAppointment/NewAppointment';

const BarLogoAlt = 'Logo';

enum Labels {
  Print = 'Печать',
  Journal = 'ЖОС',
  Appointment = 'Записать на прием',
  NewPatient = 'Новый пациент',
  Info = 'Справка',
}

const AppHeaderBar: FC = () => {
  const dispatch = useDispatch();
  const navigation = useHistory();
  const currentPatientMemo = useSelector(currentPatientInfoSelector);
  const postLoading = useSelector((state: RootState) => state.schedule.postLoading);
  const cd = useSelector((state: RootState) => state.schedule.currentDate);
  const ed = useSelector((state: RootState) => state.schedule.rangeWeekDate);
  const username = localStorage.getItem('usernameReception');
  const [showNewAppointment, setShowAppointment] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [result, setResult] = useState({
    pacient: '',
    date: '',
    time: '',
    person: '',
    speciality: ''
  });
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if(ok && !postLoading) {
      Modal.success({
        title: 'Успешно добавлена запись на приём',
        content: `Пациент ${result.pacient} записан на ${result.date} ${result.time} ко врачу ${result.person} (${result.speciality}).`,
        okText: 'ОК'
      });
      setOk(false);
    }
  },[postLoading]);

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

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  const actTicket = (data: ActionPost, id: number) => {
    setOk(true);
    dispatch(actionTicket({data: data, id: [id], beg_date: moment(cd).format('YYYY-MM-DD'), end_date:  moment(ed).format('YYYY-MM-DD')}));
    setIsModalLoading(true);
    setShowAppointment(false);
  };

  return (
    <Row align="stretch">
      <Col md={20} xs={24}>
        <Row>
          <Col className="header__logo" onClick={logoClickHandler}>
            <img src={Logo} alt={BarLogoAlt} className="app-logo" />
            <span className="header__logo-title">КАРТОТЕКА</span>
          </Col>
          <Col>
            <Space>
              <Button
                onClick={onNewPatientClick}
                size={'small'}
                className="header__button">
                {Labels.NewPatient}
              </Button>
              <Button
                size={'small'}
                className="header__button"
                onClick={showAppointment}>
                {Labels.Appointment}
              </Button>
              <Button size={'small'} onClick={() => goPath('deferred-calls')} className="header__button">
                {Labels.Journal}
              </Button>
              <Button size={'small'} className="header__button">
                {Labels.Print}
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
              <Avatar>{username?.charAt(0).toUpperCase()}</Avatar>
              <span className="block-name">{username}</span>
            </div>
          </Col>
          <Col span={4} md={4} xs={24}>
            <Row justify={'end'} align={'middle'}>
              <Col>
                <a href="/" onClick={onLogout}>
                  <img src={ExitIcon} alt=""/>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <NewAppointment
        visible={showNewAppointment}
        loading={isModalLoading}
        setVisible={setShowAppointment}
        actionTicket={actTicket}
        postLoading={postLoading}
        setResult={setResult}
        currentPatientMemo={currentPatientMemo}
      />
    </Row>
  );
};

export default AppHeaderBar;
