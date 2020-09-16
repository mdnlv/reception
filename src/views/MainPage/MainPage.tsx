import React, { FC, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import PatientsTable from '../../components/tables/PatientsTable/PatientsTable';
import PatientInfoCard from '../../components/cards/PatientInfoCard/PatientInfoCard';
import './styles.scss';
import TableSearchHeader from '../../components/tables/wrappers/TableSearchHeader/TableSearchHeader';
import TimeTable from '../../components/elements/TimeTable/TimeTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchPatients } from '../../store/patients/actions';
import exampleTree from './exampleTree';
import { fetchPatientEvents } from '../../store/patientCard/actions';
import getDetailedEvent from '../../store/utils/getDetailedEvent';
import { detailedInvalidReasonsSelector } from '../../store/rb/selectors';

const MainPage: FC = (props) => {
  const dispatch = useDispatch();
  const infoBooks = useSelector((state: RootState) => state.infoBooks);
  const { patients, isLoading } = useSelector(
    (state: RootState) => state.patients,
  );
  const { events } = useSelector((state: RootState) => state.patientCard);
  const { rbPersons, rbEventTypes } = useSelector(
    (state: RootState) => state.rb,
  );
  const [currentPatient, setCurrentPatient] = useState<number | undefined>(
    undefined,
  );
  const [showUserInfo, setShowInfo] = useState(false);
  const currentPatientMemo = useMemo(() => {
    return patients.find((item) => item.code === currentPatient);
  }, [currentPatient]);
  const selectorData = useSelector(detailedInvalidReasonsSelector);

  useEffect(() => {
    console.log('sD', selectorData);
  }, [selectorData]);

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

  const detailedAppointments = useMemo(() => {
    const appointments = getDetailedEvent(events, rbEventTypes, rbPersons);
    return appointments.map((item) => ({
      id: item.id,
      doctor: item.executedDoc,
      type: item.type,
      specialization: '',
      unit: '',
      date: item.startDate,
    }));
  }, [rbEventTypes, rbPersons, events]);

  function onTableRowClick(id: number) {
    if (id === currentPatient) {
      setCurrentPatient(undefined);
    } else {
      setCurrentPatient(id);
    }
  }

  const handlePatientsQuery = (query: string) => {
    console.log(query);
  };

  const getInfoCard = useMemo(() => {
    if (showUserInfo) {
      return !!currentPatient;
    } else {
      return false;
    }
  }, [showUserInfo, currentPatient]);

  return (
    <Row className={'main-page'}>
      <Col span={getInfoCard ? 17 : 24} className={'main-page__tables'}>
        <Row>
          <Col span={24}>
            <TableSearchHeader
              title={'Пациенты'}
              type={'filter'}
              onOpenSearch={() => {
                setShowInfo(!showUserInfo);
              }}
              onChangeQuery={handlePatientsQuery}>
              <PatientsTable
                onPatientClick={onTableRowClick}
                isLoading={isLoading}
                patients={patients}
                currentPatient={currentPatient}
              />
            </TableSearchHeader>
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
            appointments={detailedAppointments}
          />
        </Col>
      )}
    </Row>
  );
};

export default MainPage;
