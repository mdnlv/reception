import React from 'react';
import { Checkbox, Col, InputNumber, Row } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import { useFormikContext } from 'formik';
import PartialFormState from '../../../types';

const PersonalData: React.FC = (props) => {
  const form = useFormikContext<PartialFormState>();

  return (
    <div className={'form-section'}>
      <h2>По персональным данным</h2>
      <Row gutter={8}>
        <Col>
          <FormField label={'Возраст с'}>
            <InputNumber
              size={'small'}
              name={'personAgeFrom'}
              onChange={(val) => {
                if (val) {
                  form.setFieldValue('personAgeFrom', val);
                }
              }}
            />
          </FormField>
        </Col>
        <Col>
          <FormField label={'Возраст до'}>
            <InputNumber
              size={'small'}
              name={'personAgeTo'}
              onChange={(val) => {
                if (val) {
                  form.setFieldValue('yearNumberFrom', val);
                }
              }}
            />
          </FormField>
        </Col>
      </Row>
      <Row gutter={8} align={'bottom'}>
        <Col>
          <FormField label={'Год рождения'}>
            <InputNumber
              size={'small'}
              name={'yearNumberTo'}
              onChange={(val) => {
                if (val) {
                  form.setFieldValue('yearNumberTo', val);
                }
              }}
            />
          </FormField>
        </Col>
        <Col>
          <FormField label={'Месяц рождения'}>
            <InputNumber
              size={'small'}
              name={'birthMonth'}
              max={12}
              min={1}
              onChange={(val) => {
                if (val) {
                  form.setFieldValue('birthMonth', val);
                }
              }}
            />
          </FormField>
        </Col>
        <Col>
          <FormField label={'не указан адрес'} labelPosition={'right'}>
            <Checkbox
              name={'isEmptyAddress'}
              onChange={(event) => {
                if (event.target.checked) {
                  form.setFieldValue('isEmptyAddress', 1);
                } else {
                  form.setFieldValue('isEmptyAddress', 0);
                }
              }}
            />
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalData;
