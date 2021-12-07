import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col} from "antd";

import './styles.scss';
import { currentPatientInfoSelector } from '../../reduxStore/slices/patients/selectors';
import { eventsAppointments } from '../../reduxStore/slices/patientCard/selectors';
import { RootState } from '../../reduxStore/store';
import { detailedSchedules, getSpeciality } from '../../reduxStore/slices/scheduleSlice/selectors';
import { detailedPersonTree } from '../../reduxStore/slices/personTree/selectors';
import {fetchKladr, fetchKladrStreets} from "../../reduxStore/slices/registrationCard/registrationCardSlice";
import {kladrLoadingsSelector} from "../../reduxStore/slices/registrationCard/selectors";
import {fetchSchedules, actionTicket} from "../../reduxStore/slices/scheduleSlice/scheduleSlice";
import {fetchPersonTreeFull} from "../../reduxStore/slices/personTree/personTreeSlice";
import PatientInfoCard from '../../components/cards/PatientInfoCard/PatientInfoCard';
import PatientsSearchTable from '../../components/tables/PatientsSearchTable/PatientsSearchTable';

import {fetchDeferredQueue} from "../../reduxStore/slices/deferredCalls/deferredCallsSlice";
import { ActionPost } from '../../components/elements/Schedule/types';
import Schedule from '../../components/elements/Schedule/Schedule';
import PatientTickets from '../../components/cards/PatientTickets/PatientTickets';

const MainPage: FC = () => {
  const dispatch = useDispatch();
  const schedules = useSelector(detailedSchedules);
  const person_tree = useSelector(detailedPersonTree);
  const currentPatientAppointments = useSelector(eventsAppointments);
  const currentPatientMemo = useSelector(currentPatientInfoSelector);
  const specialities = useSelector(getSpeciality);
  const { loading } = useSelector((state: RootState) => state.patientCard);
  const storeActionData = useSelector((state: RootState) => state.schedule.actionData);
  const {isLoadingKladrStreetsDocumented, isLoadingKladrStreetsRegistration} = useSelector(kladrLoadingsSelector);
  const [showUserInfo, setShowInfo] = useState(false);
  const [type, setType] = useState<'pre' | 'post'>('post');

  // useEffect(() => {
  //   console.log('person_tree', person_tree);
  // }, [person_tree]);

  useEffect(() => {
    dispatch(fetchDeferredQueue())
  }, [])

  useEffect(() => {
    dispatch(fetchKladr({}));
  }, []);

  useEffect(() => {
    !person_tree.length && dispatch(fetchPersonTreeFull({}))
  }, []);

  useEffect(()=>{
    storeActionData.data && storeActionData.data.type == 'show' && dispatch(fetchPersonTreeFull({}))
  },[storeActionData]);

  const loadSchedule = (id: number[], beg_date: string, end_date: string, showEmpty: boolean) => {
    dispatch(fetchSchedules({
      id: id,
      beg_date: beg_date,
      end_date: end_date,
      showEmpty: showEmpty
    }));
  }

  const postTicket = useCallback((data: ActionPost, id:number[], beg_date: string, end_date: string) => {
    dispatch(actionTicket({
      data: data,
      id: id,
      beg_date: beg_date,
      end_date: end_date
    }));
  }, []);

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
      <Row style={{position: "relative"}}>
        <Col span={getInfoCard ? 17 : 24} className={'main-page__tables'}>
          <Row>
            <Col span={24}>
              <PatientsSearchTable onOpenSearch={openSearchQuery}/>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Schedule
                person_tree={person_tree}
                schedules={schedules}
                loadSchedule={loadSchedule}
                speciality={specialities}
                actionTicket={postTicket}
                clientTableType={type}
              />
            </Col>
          </Row>
        </Col>
        {getInfoCard && (
          <Col span={7} style={{position: "absolute", right: 0}}>
            <Row style={{height: "45vh", overflowY: "auto"}}>
              <PatientInfoCard
                isLoading={loading.events || isLoadingKladrStreetsDocumented || isLoadingKladrStreetsRegistration}
                patient={currentPatientMemo}
                appointments={currentPatientAppointments}
              />
            </Row>
            <Row>
              <PatientTickets
                client_id={Number(currentPatientMemo?.code)}
                type={type}
                setType={setType}
              />
            </Row>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default MainPage;
