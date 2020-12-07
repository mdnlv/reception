import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import './styles.scss';
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

import PatientMedInfoCard from '../../components/cards/PatientMedInfoCard/PatientMedInfoCard';
import PatientHappenings from '../../components/cards/PatientHappenings/PatientHappenings';
import LoadingContent from '../../components/elements/LoadingContent/LoadingContent';

const PatientCard: React.FC = () => {
  const { loading, currentPatient } = useSelector(
    (state: RootState) => state.patientCard,
  );
  const detailedEvents = useSelector(detailedEventsSelector);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRbPersons());
    dispatch(fetchRbEventTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCurrentPatient(parseInt(id)));
    dispatch(fetchPatientEvents(parseInt(id)));
  }, [id]);

  return (
    <Row className={'patient-card-page'}>
      <Col span={8} className={'patient-card-page__info'}>
        <LoadingContent isLoading={loading.patient}>
          {currentPatient && (
            <PatientMedInfoCard currentPatient={currentPatient} />
          )}
        </LoadingContent>
      </Col>
      <Col span={16} className={'patient-card-page__happenings'}>
        <PatientHappenings isLoading={loading.events} events={detailedEvents} />
      </Col>
    </Row>
  );
};

export default PatientCard;
