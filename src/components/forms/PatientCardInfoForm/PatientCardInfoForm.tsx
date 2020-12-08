import React, {useMemo, useEffect, useCallback} from 'react';
import {Formik} from 'formik';
import {Col, DatePicker, Divider, Input, Row, Select, Spin} from 'antd';
import MaskedInput from 'antd-mask-input';
import moment from 'moment';
import { useSelector } from 'react-redux';

import './styles.scss';
import {FormProps} from "./types";
import {detailedOrganisationsSelector} from "../../../reduxStore/slices/rb/selectors";
import {kladrLoadingsSelector, kladrSelector} from "../../../reduxStore/slices/registrationCard/selectors";
import {getAddress} from "../../../utils/getAddress";

import FormField from '../components/FormField/FormField';

const PatientCardInfoForm: React.FC<FormProps> = ({patient}) => {
  const orgsList = useSelector(detailedOrganisationsSelector);
  const { rbKladrRegistration, rbKladrStreetsRegistration } = useSelector(
    kladrSelector,
  );
  const {
    isLoadingKladrStreetsDocumented,
    isLoadingKladrStreetsRegistration,
  } = useSelector(kladrLoadingsSelector);

  const getOmsNumber = () => {
    const policies = patient.policy;
    const omsFound  = policies.filter(
      (item) => item.policyTypeId !== 3,
    );
    return omsFound[omsFound.length - 1].number;
  };

  const getPhone = () => {
    const phonesPrimary = patient.contacts.filter(
      (item) => item.isPrimary === 1 && item.contactTypeId === 3
    );
    const phoneNumber = phonesPrimary.length > 0 ? phonesPrimary[0].contact : '';
    return phoneNumber;
  };

  const getOrganization = useCallback(() => {
    const organization = orgsList.find((item) => item.id === patient.work[0].id);
    return organization?.name
  }, [orgsList.length > 0 && orgsList]);

  const valuesMemo = useMemo(() => {
    return {
      code: patient.code,
      fullName: patient.fullName,
      birthDate: patient.birthDate,
      sex: patient.sex,
      regAddress: getAddress(patient, 0, rbKladrRegistration, rbKladrStreetsRegistration),
      livingAddress: getAddress(patient, 1, rbKladrRegistration, rbKladrStreetsRegistration),
      birthPlace: patient.birthPlace,
      phone: getPhone() || '',
      snils: patient.snils,
      oms: patient.policy.length > 0 ? getOmsNumber() : '',
      organization: getOrganization() || patient.work[0].freeInput || '',
      post: patient.work[0].post || ''
    };
  }, [patient]);

  return isLoadingKladrStreetsRegistration || isLoadingKladrStreetsDocumented
    ? (
      <div className={'person-info-loading__wrapper'}>
        <Spin />
      </div>
    )
    : (
      <Formik initialValues={valuesMemo} onSubmit={() => {}}>
        {(formProps) => (
          <form className={'patient-card-info-form'}>
            <h3 className={'content-title'}>Общая информация</h3>
            <div className="form-section">
              <Row className={'form-section__item code-item'}>
                <Col>
                  <FormField label={'Код'} labelPosition={'left'}>
                    <Input size={'small'} value={formProps.values.code} disabled/>
                  </FormField>
                </Col>
              </Row>
              <Row className={'form-section__item name-item'}>
                <Col>
                  <FormField label={'ФИО'} labelPosition={'left'}>
                    <Input
                      size={'small'}
                      onChange={(event) => {
                        formProps.setFieldValue('fullName', event.target.value);
                      }}
                      value={formProps.values.fullName}
                    />
                  </FormField>
                </Col>
              </Row>
              <Row className={'form-section__item birth-date-item'}>
                <Col>
                  <FormField label={'Дата рождения'} labelPosition={'left'}>
                    <DatePicker
                      value={
                        formProps.values.birthDate
                          ? moment(formProps.values.birthDate)
                          : undefined
                      }
                      onChange={(date) => {
                        if (date) {
                          formProps.setFieldValue('birthDate', date.toDate());
                        }
                      }}
                    />
                  </FormField>
                </Col>
              </Row>
              <Row className={'form-section__item gender-item'}>
                <Col>
                  <FormField label={'Пол'} labelPosition={'left'}>
                    <Select
                      value={formProps.values.sex}
                      onChange={(val) => {
                        formProps.setFieldValue('sex', val);
                      }}
                      size={'small'}>
                      <Select.Option value={1}>М</Select.Option>
                      <Select.Option value={2}>Ж</Select.Option>
                    </Select>
                  </FormField>
                </Col>
              </Row>
              <Divider />
              <Row className={'form-section__item reg-item'}>
                <Col>
                  <FormField label={'Регистрация'} labelPosition={'left'}>
                    <Input
                      value={formProps.values.regAddress}
                      onChange={(event) => {
                        formProps.setFieldValue('regAddress', event.target.value);
                      }}
                      size={'small'}
                    />
                  </FormField>
                </Col>
              </Row>
              <Row className={'form-section__item living-address-item'}>
                <Col>
                  <FormField label={'Проживает'} labelPosition={'left'}>
                    <Input
                      value={formProps.values.livingAddress}
                      onChange={(event) => {
                        formProps.setFieldValue('livingAddress', event.target.value);
                      }}
                      size={'small'}
                    />
                  </FormField>
                </Col>
              </Row>
              <Row className={'form-section__item birth-place-item'}>
                <Col>
                  <FormField label={'Место рождения'} labelPosition={'left'}>
                    <Input
                      value={formProps.values.birthPlace}
                      onChange={(event) => {
                        formProps.setFieldValue('birthPlace', event.target.value);
                      }}
                      size={'small'}
                    />
                  </FormField>
                </Col>
              </Row>
              <Row className={'form-section__item phone-item'}>
                <Col>
                  <FormField label={'Телефон'} labelPosition={'left'}>
                    <MaskedInput
                      mask={'+7 111 111 11 11'}
                      placeholder={'+7 999 889 89 89'}
                      value={formProps.values.phone}
                      onChange={(event) => {
                        formProps.setFieldValue('phone', event.target.value);
                      }}
                    />
                  </FormField>
                </Col>
              </Row>
            </div>
            <h3 className={'content-title'}>Документы</h3>
            <div className="form-section">
              <Row className={'form-section__item snils-item'}>
                <Col>
                  <FormField label={'СНИЛС'} labelPosition={'left'}>
                    <Input
                      value={formProps.values.snils}
                      onChange={(event) => {
                        formProps.setFieldValue('snils', event.target.value);
                      }}
                      size={'small'}
                    />
                  </FormField>
                </Col>
              </Row>
              <Row className={'form-section__item attachment-item'}>
                <Col>
                  <FormField label={'Прикрепление'} labelPosition={'left'}>
                    <Input size={'small'} />
                  </FormField>
                </Col>
              </Row>
              <Row className={'form-section__item passport-item'}>
                <Col>
                  <FormField label={'Паспорт'} labelPosition={'left'}>
                    <Input size={'small'} />
                  </FormField>
                </Col>
              </Row>
              <Row className={'form-section__item oms-item'}>
                <Col>
                  <FormField label={'ОМС'} labelPosition={'left'}>
                    <Input
                      value={formProps.values.oms}
                      onChange={(event) => {
                        formProps.setFieldValue('oms', event.target.value);
                      }}
                      size={'small'}
                    />
                  </FormField>
                </Col>
              </Row>
            </div>
            <h3 className={'content-title'}>Медицинская информация</h3>
            <div className="form-section">
              <Row className={'form-section__item doc-item'}>
                <Col>
                  <FormField label={'Лечащий врач'} labelPosition={'left'}>
                    <Input size={'small'} />
                  </FormField>
                </Col>
              </Row>
              <Row className={'form-section__item features-item'}>
                <Col>
                  <FormField label={'Особенности'} labelPosition={'left'}>
                    <Input size={'small'} />
                  </FormField>
                </Col>
              </Row>
            </div>
            <h3 className={'content-title'}>Занятость</h3>
            <div className="form-section">
              <Row className={'form-section__item work-place-item'}>
                <Col>
                  <FormField label={'Место работы'} labelPosition={'left'}>
                    <Input
                      size={'small'}
                      value={formProps.values.organization}
                      onChange={(event) => {
                        formProps.setFieldValue('organization', event.target.value);
                      }}
                    />
                  </FormField>
                </Col>
              </Row>
              <Row className={'form-section__item work-specialization'}>
                <Col>
                  <FormField label={'Специлизация'} labelPosition={'left'}>
                    <Input
                      size={'small'}
                      value={formProps.values.post}
                      onChange={(event) => {
                        formProps.setFieldValue('post', event.target.value);
                      }}
                    />
                  </FormField>
                </Col>
              </Row>
            </div>
          </form>
        )}
      </Formik>
    );
};

export default PatientCardInfoForm;
