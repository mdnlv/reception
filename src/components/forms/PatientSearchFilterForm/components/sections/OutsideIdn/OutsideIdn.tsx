import React from 'react';
import { Col, Input, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import { useFormikContext } from 'formik';
import PartialFormState from '../../../types';

const OutsideIdn: React.FC = (props) => {
  const form = useFormikContext<PartialFormState>();

  return (
    <div className={'form-section'}>
      <h2>По внешнему идентификатору</h2>
      <Row>
        <Col span={24}>
          <FormField label={'Тип'}>
            <Select size={'small'} />
          </FormField>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormField label={'Идентификатор'}>
            <Input
              size={'small'}
              name={'identifier'}
              onChange={form.handleChange}
            />
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default OutsideIdn;
