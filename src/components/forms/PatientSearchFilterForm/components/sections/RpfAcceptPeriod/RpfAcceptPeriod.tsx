import React from 'react';
import { Checkbox, Col, DatePicker, Row } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import PartialFormState from '../../../types';
import { useFormikContext } from 'formik';
import moment from 'moment';

const RpfAcceptPeriod: React.FC = (props) => {
  const form = useFormikContext<PartialFormState>();

  return (
    <div className={'form-section'}>
      <h2>Период подтверждения РПФ</h2>
      <Row>
        <Col span={24}>
          <FormField>
            <DatePicker
              size={'small'}
              value={
                form.values.begDateRPFConfirmed
                  ? moment(new Date(form.values.begDateRPFConfirmed))
                  : undefined
              }
              onChange={(date) => {
                if (date) {
                  form.setFieldValue('begDateRPFConfirmed', date.toISOString());
                }
              }}
            />
          </FormField>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col>
          <FormField>
            <Checkbox
              name={'isRPFUnconfirmed'}
              onChange={(e) => {
                if (e.target.checked) {
                  form.setFieldValue('isRPFUnconfirmed', 1);
                } else {
                  form.setFieldValue('isRPFUnconfirmed', 0);
                }
              }}>
              неподтвержденные РПФ
            </Checkbox>
          </FormField>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col>
          <FormField>
            <Checkbox
              name={'isOncologyForm90'}
              onChange={(e) => {
                if (e.target.checked) {
                  form.setFieldValue('isOncologyForm90', 1);
                } else {
                  form.setFieldValue('isOncologyForm90', 0);
                }
              }}>
              онкологическая форма 90
            </Checkbox>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default RpfAcceptPeriod;
