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
import TimeTable from '../../components/elements/TimeTable/TimeTable';
import exampleTree from './exampleTree';

const MainPage: FC = (props) => {
  const dispatch = useDispatch();
  const [showUserInfo, setShowInfo] = useState(false);

  //selectors
  const { isLoading, currentPatient } = useSelector(
    (state: RootState) => state.patients,
  );
  const currentPatientAppointments = useSelector(eventsAppointments);
  const currentPatientMemo = useSelector(currentPatientInfoSelector);
  const { rbPersons, rbEventTypes } = useSelector(
    (state: RootState) => state.rb,
  );
  const { loading } = useSelector((state: RootState) => state.patientCard);

  useEffect(() => {
    if (currentPatient) {
      dispatch(fetchPatientEvents(currentPatient));
    }
  }, [currentPatient, rbPersons, rbEventTypes]);

  const getInfoCard = useMemo(() => {
    if (showUserInfo) {
      return !!currentPatient;
    } else {
      return false;
    }
  }, [showUserInfo, currentPatient]);

  const openSearchQuery = useCallback(() => {
    setShowInfo(!showUserInfo);
  }, [showUserInfo]);

  return (
    <Row className={'main-page'}>
      <Col span={getInfoCard ? 17 : 24} className={'main-page__tables'}>
        <Row>
          <Col span={24}>
            <PatientsSearchTable onOpenSearch={openSearchQuery} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TimeTable data={exampleTree} />
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
  );
};

export default MainPage;
