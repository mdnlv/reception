import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import PatientInfoCard from '../../components/cards/PatientInfoCard/PatientInfoCard';
import './styles.scss';
import TableSearchHeader from '../../components/tables/wrappers/TableSearchHeader/TableSearchHeader';
import TimeTable from '../../components/elements/TimeTable/TimeTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchPatients } from '../../store/patients/actions';
import exampleTree from './exampleTree';
import { fetchPatientEvents } from '../../store/patientCard/actions';
import PatientsSearchTable from '../../components/tables/PatientsSearchTable/PatientsSearchTable';
import { currentPatientInfoSelector } from '../../store/patients/selectors';
import { eventsAppointments } from '../../store/patientCard/selectors';

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

  useEffect(() => {
    dispatch(
      fetchPatients({
        limit: 300,
        offset: 0,
      }),
    );
  }, []);

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
            <TableSearchHeader
              className={'docs-search-table'}
              title={'Врачи'}
              type={'filter'}
              onOpenSearch={() => {
                setShowInfo(!showUserInfo);
              }}
              onChangeQuery={() => {}}>
              <TimeTable data={exampleTree} />
            </TableSearchHeader>
          </Col>
        </Row>
      </Col>
      {getInfoCard && (
        <Col span={7}>
          <PatientInfoCard
            isLoading={isLoading}
            patient={currentPatientMemo}
            appointments={currentPatientAppointments}
          />
        </Col>
      )}
    </Row>
  );
};

export default MainPage;
