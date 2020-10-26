import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import PatientInfoCard from '../../components/cards/PatientInfoCard/PatientInfoCard';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import PatientsSearchTable from '../../components/tables/PatientsSearchTable/PatientsSearchTable';
import { currentPatientInfoSelector } from '../../reduxStore/slices/patients/selectors';
import { eventsAppointments } from '../../reduxStore/slices/patientCard/selectors';
import { fetchPatientEvents } from '../../reduxStore/slices/patientCard/patientCardSlice';
import { RootState } from '../../reduxStore/store';
import ScheduleTable from '../../components/elements/ScheduleTable/ScheduleTable';
import data from '../../components/elements/ScheduleTable/data';

const MainPage: FC = () => {
  const dispatch = useDispatch();
  const [showUserInfo, setShowInfo] = useState(false);

  //selectors
  const currentPatientAppointments = useSelector(eventsAppointments);
  const currentPatientMemo = useSelector(currentPatientInfoSelector);
  const { loading } = useSelector((state: RootState) => state.patientCard);

  useEffect(() => {
    if (currentPatientMemo) {
      dispatch(fetchPatientEvents(currentPatientMemo.code));
    }
  }, [currentPatientMemo]);

  const getInfoCard = useMemo(() => {
    if (showUserInfo) {
      return !!currentPatientMemo;
    } else {
      return false;
    }
  }, [showUserInfo, currentPatientMemo]);

  const openSearchQuery = useCallback(() => {
    setShowInfo((prevState) => {
      return !prevState;
    });
  }, []);

  return (
    <div className={'main-page'}>
      <Row>
        <Col span={getInfoCard ? 17 : 24} className={'main-page__tables'}>
          <Row>
            <Col span={24}>
              <PatientsSearchTable onOpenSearch={openSearchQuery} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ScheduleTable />
            </Col>
          </Row>
        </Col>
        {getInfoCard && (
          <Col span={7}>
            <PatientInfoCard
              isLoading={loading.events}
              patient={currentPatientMemo}
              appointments={currentPatientAppointments}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default MainPage;
