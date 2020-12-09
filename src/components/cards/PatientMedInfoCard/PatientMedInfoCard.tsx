import React, {useEffect} from 'react';
import {Button, Row} from 'antd';
import {useHistory} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import './styles.scss';
import {InfoCardProps} from "./types";
import {
  fetchKladr,
  fetchKladrStreets
} from "../../../reduxStore/slices/registrationCard/registrationCardSlice";
import {kladrLoadingsSelector, kladrSelector} from "../../../reduxStore/slices/registrationCard/selectors";

import PatientCardInfoForm from '../../forms/PatientCardInfoForm/PatientCardInfoForm';

const PatientMedInfoCard: React.FC<InfoCardProps> = ({currentPatient}) => {
  const dispatch = useDispatch();
  const navigation = useHistory();
  const {
    rbKladrDocumented,
    rbKladrRegistration,
  } = useSelector(kladrSelector);
  const {
    isLoadingKladrRegistration,
    isLoadingKladrStreetsDocumented,
  } = useSelector(kladrLoadingsSelector);

  useEffect(() => {
    rbKladrRegistration.length === 0 && dispatch(fetchKladr({}));
  }, []);

  useEffect(() => {
    const patientsAddress = currentPatient.address;
    for (let i = 0; i < patientsAddress.length; i++) {
      if (!patientsAddress[i].freeInput) {
        dispatch(fetchKladrStreets(
          {
            id: patientsAddress[i].address.KLADRCode,
            type: patientsAddress[i].type === 0 ? 'documented' : 'registration'
          }))
      }
    }
  }, [currentPatient]);

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <div className={'patient-card'}>
      <Row
        justify={'space-between'}
        align={'middle'}
        className="patient-card__header">
        <h3 className={'header-title'}>Пациент</h3>
        <div className="patient-card__header-actions header-actions">
          <Button
            size={'small'}
            className={'header-actions__logout'}
            onClick={navigateBack}>
            Выйти из мед карты
          </Button>
          <Button size={'small'} className={'header-actions__save save-btn'}>
            Сохранить
          </Button>
        </div>
      </Row>
      <div className="patient-card__content">
        <PatientCardInfoForm
          patient={currentPatient}
          isLoadingKladr={isLoadingKladrRegistration}
          isLoadingKladrStreets={isLoadingKladrStreetsDocumented}
          kladr={rbKladrDocumented}
        />
      </div>
    </div>
  );
};

export default PatientMedInfoCard;
