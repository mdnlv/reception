import React from 'react';
import { Formik } from 'formik';
import { Button, Col, Row } from 'antd/lib';
import { useDispatch, useSelector } from 'react-redux';

import './styles.scss';
import PartialFormState from './types';
import { FormProps } from './types';
import validation from './validation';
import { fetchFiltersPatients } from '../../../reduxStore/slices/patients/patientsSlice';
import {
  detailedOrganisationsSelector,
  detailedPersonsSelector,
} from '../../../reduxStore/slices/rb/selectors';
import Fields from './components/Fields/Fields';

const initialStore = {
  organisation: '',
  speciality: '',
  post: '',
  person: '',
};

const DoctorSearchFilterForm: React.FC<FormProps> = ({
  onClose,
  onSubmit,
}) => {
  const dispatch = useDispatch();
  const rbPersons = useSelector(detailedPersonsSelector);
  const rbOrgs = useSelector(detailedOrganisationsSelector);

  const onFormSubmit = (values: PartialFormState) => {
    if (onSubmit) {
      onSubmit();
    }
    dispatch(
      fetchFiltersPatients({
        ...values,
      }),
    );
    if (onClose) {
      onClose();
    }
  };

  return (
    <Formik
      initialValues={{ ...initialStore }}
      validationSchema={validation}
      onSubmit={onFormSubmit}>
      {(formProps) => (
        <form className={'patient-search-filter-form'}>
          <Fields/>
          <Row gutter={8} justify={'center'}>
            <Col>
              <Button
                type={'primary'}
                onClick={() => {
                  formProps.resetForm();
                }}
                danger>
                Сбросить
              </Button>
            </Col>
            <Col>
              <Button
                type={'primary'}
                onClick={() => {
                  formProps.handleSubmit();
                }}
                className={'save-btn'}>
                Применить
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default DoctorSearchFilterForm;
