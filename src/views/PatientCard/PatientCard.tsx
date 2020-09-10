import React, { useEffect } from 'react';
import './styles.scss';
import { Col, Row, Spin } from 'antd';
import PatientMedInfoCard from '../../components/cards/PatientMedInfoCard/PatientMedInfoCard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  fetchIdPatient,
  fetchPatientEvents,
} from '../../store/patientCard/actions';
import { RootState } from '../../store/store';
import { fetchEventTypes, fetchPersons } from '../../store/rb/actions';

const PatientCard: React.FC = (props) => {
  const dispatch = useDispatch();
  const { isLoading, currentPatient, events } = useSelector(
    (state: RootState) => state.patientCard,
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchPersons());
    dispatch(fetchEventTypes());
  }, []);

  useEffect(() => {
    dispatch(fetchIdPatient(parseInt(id)));
    dispatch(fetchPatientEvents(parseInt(id)));
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={'spinner-wrapper'}>
          <Spin size="large" />
        </div>
      ) : (
        <Row className={'patient-card-page'}>
          <Col span={8} className={'patient-card-page__info'}>
            {currentPatient && (
              <PatientMedInfoCard currentPatient={currentPatient} />
            )}
          </Col>
          <Col span={16} className={'patient-card-page__happenings'}></Col>
        </Row>
      )}
    </>
  );
};

export default PatientCard;
