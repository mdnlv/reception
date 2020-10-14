import React, { useEffect } from 'react';
import './styles.scss';
import { Col, Row, Spin } from 'antd';
import PatientMedInfoCard from '../../components/cards/PatientMedInfoCard/PatientMedInfoCard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import PatientHappenings from '../../components/cards/PatientHappenings/PatientHappenings';
import {
  fetchCurrentPatient,
  fetchPatientEvents,
} from '../../reduxStore/slices/patientCard/patientCardSlice';
import {
  fetchRbEventTypes,
  fetchRbPersons,
} from '../../reduxStore/slices/rb/rbSlice';
import { detailedEventsSelector } from '../../reduxStore/slices/patientCard/selectors';
import { RootState } from '../../reduxStore/store';

const PatientCard: React.FC = (props) => {
  const dispatch = useDispatch();
  const { loading, currentPatient, events } = useSelector(
    (state: RootState) => state.patientCard,
  );
  const detailedEvents = useSelector(detailedEventsSelector);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchRbPersons());
    dispatch(fetchRbEventTypes());
  }, []);

  useEffect(() => {
    dispatch(fetchCurrentPatient(parseInt(id)));
    dispatch(fetchPatientEvents(parseInt(id)));
  }, []);

  return (
    <Row className={'patient-card-page'}>
      <Col span={8} className={'patient-card-page__info'}>
        {currentPatient && (
          <PatientMedInfoCard currentPatient={currentPatient} />
        )}
      </Col>
      <Col span={16} className={'patient-card-page__happenings'}>
        <PatientHappenings isLoading={loading.events} events={detailedEvents} />
      </Col>
    </Row>
  );
};

export default PatientCard;
