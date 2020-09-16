import React, { useEffect, useMemo } from 'react';
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
import PatientHappenings from '../../components/cards/PatientHappenings/PatientHappenings';
import Person from '../../types/data/Person';

const PatientCard: React.FC = (props) => {
  const dispatch = useDispatch();
  const { isLoading, currentPatient, events } = useSelector(
    (state: RootState) => state.patientCard,
  );
  const { rbEventTypes, rbPersons } = useSelector(
    (state: RootState) => state.rb,
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

  const getPersonName = (person?: Person) => {
    return person
      ? `${person?.lastName} ${person?.firstName} ${person?.patrName}`
      : '';
  };

  const detailedEvents = useMemo(() => {
    return events.map((item) => ({
      id: item.id,
      type:
        (item.eventTypeId &&
          rbEventTypes.find((eItem) => item.eventTypeId === eItem.id)?.name) ||
        '',
      assignDoc: getPersonName(
        rbPersons.find((pItem) => item.createPersonId === pItem.id),
      ),
      executedDoc: '',
      state: '',
      startDate: item.createDatetime
        ? new Date(item.createDatetime)
        : new Date(),
    }));
  }, [events, rbPersons, rbEventTypes]);

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
          <Col span={16} className={'patient-card-page__happenings'}>
            <PatientHappenings events={detailedEvents} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default PatientCard;
