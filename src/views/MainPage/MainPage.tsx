import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import './styles.scss';
import { currentPatientInfoSelector } from '../../reduxStore/slices/patients/selectors';
import { eventsAppointments } from '../../reduxStore/slices/patientCard/selectors';
import { fetchPatientEvents } from '../../reduxStore/slices/patientCard/patientCardSlice';
import { RootState } from '../../reduxStore/store';
import { detailedSchedules } from '../../reduxStore/slices/scheduleSlice/selectors';
import {fetchKladr, fetchKladrStreets} from "../../reduxStore/slices/registrationCard/registrationCardSlice";
import {kladrLoadingsSelector} from "../../reduxStore/slices/registrationCard/selectors";

import PatientInfoCard from '../../components/cards/PatientInfoCard/PatientInfoCard';
import PatientsSearchTable from '../../components/tables/PatientsSearchTable/PatientsSearchTable';
import ScheduleTable from '../../components/elements/ScheduleTable/ScheduleTable';

const MainPage: FC = () => {
  const [showUserInfo, setShowInfo] = useState(false);
  const schedules = useSelector(detailedSchedules);
  const currentPatientAppointments = useSelector(eventsAppointments);
  const currentPatientMemo = useSelector(currentPatientInfoSelector);
  const { loading } = useSelector((state: RootState) => state.patientCard);
  const {isLoadingKladrStreetsDocumented, isLoadingKladrStreetsRegistration} = useSelector(kladrLoadingsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchKladr({}));
  }, []);

  useEffect(() => {
    // console.log('currentPatientMemo', currentPatientMemo);
    if (currentPatientMemo) {
      if (
        currentPatientMemo.address &&
        currentPatientMemo.address[0] &&
        currentPatientMemo.address[0].freeInput === '' &&
        currentPatientMemo.address[0].address.KLADRCode &&
        currentPatientMemo.address[0].address.KLADRStreetCode
      ) {
        dispatch(
          fetchKladrStreets({
            id: currentPatientMemo.address[0].address.KLADRCode,
            type: 'documented',
          }),
        );
      }
      if (
        currentPatientMemo.address &&
        currentPatientMemo.address[1] &&
        currentPatientMemo.address[1].freeInput === '' &&
        currentPatientMemo.address[1].address.KLADRCode &&
        currentPatientMemo.address[1].address.KLADRStreetCode
      ) {
        dispatch(
          fetchKladrStreets({
            id: currentPatientMemo.address[1].address.KLADRCode,
            type: 'registration',
          }),
        );
      }
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
        </Col>
        {getInfoCard && (
          <Col span={7}>
            <PatientInfoCard
              isLoading={loading.events || isLoadingKladrStreetsDocumented || isLoadingKladrStreetsRegistration}
              patient={currentPatientMemo}
              appointments={currentPatientAppointments}
            />
          </Col>
        )}
      </Row>
      <Row>
        <Col span={24}>
          <ScheduleTable schedules={schedules} />
        </Col>
      </Row>
    </div>
  );
};

export default MainPage;
