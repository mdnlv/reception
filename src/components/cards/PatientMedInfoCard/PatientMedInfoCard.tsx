import React from 'react';
import {Button, Row} from 'antd';
import PatientCardInfoForm from '../../forms/PatientCardInfoForm/PatientCardInfoForm';
import './styles.scss';
import {useHistory} from 'react-router';
import Patient from '../../../types/data/Patient';

interface InfoCardProps {
  currentPatient: Patient;
}

const PatientMedInfoCard: React.FC<InfoCardProps> = (props) => {
  const navigation = useHistory();

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
        <PatientCardInfoForm patient={props.currentPatient} />
      </div>
    </div>
  );
};

export default PatientMedInfoCard;
