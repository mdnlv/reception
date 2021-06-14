import React, { FC, useCallback, useState, useEffect } from 'react';
import { Avatar, Button, Col, Row, Space } from 'antd/lib';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { currentPatientInfoSelector } from '../../../reduxStore/slices/patients/selectors';
import {RootState} from "../../../reduxStore/store";
import Logo from '../../../assets/icons/app-logo.svg';
import ExitIcon from '../../../assets/icons/exit.svg';
import './styles.scss';
import { Modal } from 'antd';
import {actionTicket, fetchItem} from "../../../reduxStore/slices/scheduleSlice/scheduleSlice";

import NewAppointment from '../../modals/NewAppointment/NewAppointment';
import { ActionPost } from '../ScheduleTable/types';

const BarLogoAlt = 'Logo';

enum Labels {
  Print = 'Печать',
  Journal = 'ЖОС',
  Appointment = 'Записать на прием',
  NewPatient = 'Новый пациент',
  Info = 'Справка',
}

const AppHeaderBar: FC = () => {
  const currentPatientMemo = useSelector(currentPatientInfoSelector);
  const postLoading = useSelector((state: RootState) => state.schedule.postLoading);
  const navigation = useHistory();
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
  const dispatch = useDispatch()

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

  const actTicket = (data: ActionPost, id: number) => {
    setOk(true);
    dispatch(actionTicket(data));
    setIsModalLoading(true);
    setShowAppointment(false); 
  };

  useEffect(() => {
    if(ok && !postLoading) {
      Modal.success({
        title: 'Успешно добавлена запись на приём',
        content: `Пациент ${result.pacient} записан на ${result.date} ${result.time} ко врачу ${result.person} (${result.speciality}).`,
        okText: 'ОК'
      });
      setOk(false);
    }
  },[postLoading])

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
              <Button size={'small'} onClick={() => goPath('deferred-calls')} className="header__button">
                {Labels.Journal}
              </Button>
              <Button
                size={'small'}
                className="header__button"
                onClick={showAppointment}>
                {Labels.Appointment}
              </Button>
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
