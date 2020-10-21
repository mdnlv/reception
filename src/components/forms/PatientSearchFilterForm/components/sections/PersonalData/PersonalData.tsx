import React, { useCallback } from 'react';
import { Checkbox, Col, Row } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import { useFormikContext } from 'formik';
import PartialFormState from '../../../types';
import FastInputNumber from '../../../../components/fields/FastInputNumber/FastInpuNumber';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const PersonalData: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<PartialFormState>();

  const onCheckboxChange = useCallback(
    (e: CheckboxChangeEvent) => {
      if (e.target.checked) {
        setFieldValue('isEmptyAddress', 1);
      } else {
        setFieldValue('isEmptyAddress', 0);
      }
    },
    [setFieldValue],
  );

  return (
    <div className={'form-section'}>
      <h2>По персональным данным</h2>
      <Row gutter={8}>
        <Col>
          <FormField label={'Возраст с'}>
            <FastInputNumber min={0} size={'small'} name={'personAgeFrom'} />
          </FormField>
        </Col>
        <Col>
          <FormField label={'Возраст до'}>
            <FastInputNumber
              size={'small'}
              min={values.personAgeFrom || 0}
              name={'personAgeTo'}
            />
          </FormField>
        </Col>
      </Row>
      <Row gutter={8} align={'bottom'}>
        <Col>
          <FormField label={'Год рождения'}>
            <FastInputNumber
              size={'small'}
              min={1900}
              max={new Date().getFullYear()}
              name={'yearNumberTo'}
            />
          </FormField>
        </Col>
        <Col>
          <FormField label={'Месяц рождения'}>
            <FastInputNumber
              max={12}
              min={1}
              size={'small'}
              name={'birthMonth'}
            />
          </FormField>
        </Col>
        <Col>
          <FormField label={'не указан адрес'} labelPosition={'right'}>
            <Checkbox name={'isEmptyAddress'} onChange={onCheckboxChange} />
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalData;
