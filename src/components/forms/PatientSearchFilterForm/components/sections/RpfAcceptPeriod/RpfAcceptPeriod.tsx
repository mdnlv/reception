import React, {useCallback} from 'react';
import {Checkbox, Col, Row} from 'antd/lib';
import {useFormikContext} from 'formik';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';

import PartialFormState from '../../../types';

import FormField from '../../../../components/FormField/FormField';
import FastDatePicker from '../../../../components/fields/FastDatePicker/FastDatePicker';

const RpfAcceptPeriod: React.FC = () => {
  const { setFieldValue } = useFormikContext<PartialFormState>();

  const onCheckboxChange = useCallback(
    (e: CheckboxChangeEvent) => {
      setFieldValue(e.target.name || '', e.target.checked ? 1 : 0);
    },
    [setFieldValue],
  );

  return (
    <div className={'form-section'}>
      <h2>Период подтверждения РПФ</h2>
      <Row>
        <Col span={24}>
          <FormField>
            <FastDatePicker size={'small'} name={'begDateRPFConfirmed'} />
          </FormField>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col>
          <FormField>
            <Checkbox name={'isRPFUnconfirmed'} onChange={onCheckboxChange}>
              неподтвержденные РПФ
            </Checkbox>
          </FormField>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col>
          <FormField>
            <Checkbox name={'isOncologyForm90'} onChange={onCheckboxChange}>
              онкологическая форма 90
            </Checkbox>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default RpfAcceptPeriod;
