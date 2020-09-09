import React, { useEffect } from 'react';
import './styles.scss';
import { Col, Row, Spin } from 'antd';
import PatientMedInfoCard from '../../components/cards/PatientMedInfoCard/PatientMedInfoCard';
import PatientHappenings from '../../components/cards/PatientHappenings/PatientHappenings';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchIdPatient } from '../../store/patientCard/actions';
import { RootState } from '../../store/store';

const PatientCard: React.FC = (props) => {
  const dispatch = useDispatch();
  const { isLoading, currentPatient } = useSelector(
    (state: RootState) => state.patientCard,
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchIdPatient(parseInt(id)));
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
          <Col span={16} className={'patient-card-page__happenings'}>
            <PatientHappenings />
          </Col>
        </Row>
      )}
    </>
  );
};

export default PatientCard;
