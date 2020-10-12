import React from 'react';
import { Formik } from 'formik';
import { Button, Col, Divider, Row } from 'antd';
import PersonDisabilities from './components/sections/PersonDisabilities/PersonDisabilities';
import AuthorDateChange from './components/sections/AuthorDateChange/AuthorDateChange';
import PersonalData from './components/sections/PersonalData/PersonalData';
import LpuAttachment from './components/sections/LpuAttachment/LpuAttachment';
import RpfAcceptPeriod from './components/sections/RpfAcceptPeriod/RpfAcceptPeriod';
import PreventiveMeasures from './components/sections/PreventiveMeasures/PreventiveMeasures';
import OutsideIdn from './components/sections/OutsideIdn/OutsideIdn';
import './styles.scss';
import PartialFormState from './types';
import { useDispatch, useSelector } from 'react-redux';
import PersonArea from './components/sections/PersonArea/PersonArea';
import PersonBed from './components/sections/PersonBed/PersonBed';
import PersonAttachment from './components/sections/PersonAttachment/PersonAttachment';
import validation from './validation';
import { fetchFiltersPatients } from '../../../reduxStore/slices/patients/patientsSlice';
import {
  detailedAccountingSystemSelector,
  detailedInvalidDocuments,
  detailedInvalidReasonsSelector,
  detailedOrganisationsSelector,
  detailedPersonsSelector,
} from '../../../reduxStore/slices/rb/selectors';

interface FormProps {
  onClose?(): void;
  onClearForm?(): void;
  onSubmit?(): void;
}

const PatientSearchFilterForm: React.FC<FormProps> = (props) => {
  const dispatch = useDispatch();
  const invalidReasons = useSelector(detailedInvalidReasonsSelector);
  const rbPersons = useSelector(detailedPersonsSelector);
  const rbInvalidDocs = useSelector(detailedInvalidDocuments);
  const rbOrgs = useSelector(detailedOrganisationsSelector);
  const rbAccountTypes = useSelector(detailedAccountingSystemSelector);

  const initialStore: PartialFormState = {
    tempInvalidDocumentBegDate: '',
    tempInvalidDocumentEndDate: '',
    tempInvalidDocumentSerial: '',
    tempInvalidDocumentNumber: '',
    tempInvalidReasonId: undefined,
    clientExamPlanKindId: undefined,
    clientExamPlanYear: undefined,
    clientExamPlanQuarter: undefined,
    begDateRPFConfirmed: undefined,
    isRPFUnconfirmed: undefined,
    isOncologyForm90: undefined,
    identifier: '',
    personAgeFrom: undefined,
    personAgeTo: undefined,
    birthYear: undefined,
    birthMonth: undefined,
  };

  return (
    <Formik
      initialValues={{ ...initialStore }}
      validationSchema={validation}
      onSubmit={async (values, formikHelpers) => {
        if (props.onSubmit) {
          props.onSubmit();
        }
        await dispatch(
          fetchFiltersPatients({
            ...values,
            tempInvalidReasonId: 1,
            tempInvalidDocumentTypeId: 1,
            begBirthDate: '2000-01-01',
          }),
        );
        if (props.onClose) {
          props.onClose();
        }
      }}>
      {(formProps) => (
        <form className={'patient-search-filter-form'}>
          <Row>
            <Col span={10} className={'col--border-right'}>
              <PersonDisabilities
                invalidDocs={rbInvalidDocs}
                invalidReasons={invalidReasons}
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={7} className={'col--border-right'}>
              <AuthorDateChange persons={rbPersons} />
            </Col>
            <Col span={6} className={'col--border-right'}>
              <PersonalData />
            </Col>
            <Col span={5} className={'col--border-right'}>
              <PersonArea orgs={rbOrgs} />
            </Col>
            <Col span={3} className={'col--border-right'}>
              <PersonBed orgs={rbOrgs} />
            </Col>
            <Col span={3}>
              <PersonAttachment />
            </Col>
          </Row>
          <Divider />
          <Row align={'stretch'}>
            <Col span={6} className={'col--border-right'}>
              <LpuAttachment orgs={rbOrgs} />
            </Col>
            <Col span={5} className={'col--border-right'}>
              <RpfAcceptPeriod />
            </Col>
            <Col span={7} className={'col--border-right'}>
              <PreventiveMeasures />
            </Col>
            <Col span={6}>
              <OutsideIdn accountTypes={rbAccountTypes} />
            </Col>
          </Row>
          <Row gutter={8} justify={'end'}>
            <Col>
              <Button
                type={'primary'}
                onClick={() => {
                  if (props.onClearForm) {
                    props.onClearForm();
                  }
                }}
                danger>
                Сбросить
              </Button>
            </Col>
            <Col>
              <Button
                type={'primary'}
                onClick={(e) => {
                  formProps.handleSubmit();
                }}
                className={'save-btn'}>
                Применить фильтры
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default PatientSearchFilterForm;
