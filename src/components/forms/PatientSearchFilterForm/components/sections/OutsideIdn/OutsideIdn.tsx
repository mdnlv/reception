import React, {useCallback} from 'react';
import { Col, Row, Select } from 'antd/lib';

import {SectionProps} from "./types";

import FormField from '../../../../components/FormField/FormField';
import FastInput from '../../../../components/fields/FastInput/FastInput';
import FastSearchSelect from '../../../../components/fields/FastSearchSelect/FastSearchSelect';

const OutsideIdn: React.FC<SectionProps> = ({ accountTypes }) => {
  const accountTypesOptions = useCallback(() => {
    return accountTypes.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id}>
        {item.name}
      </Select.Option>
    ));
  }, [accountTypes]);

  return (
    <div className={'form-section'}>
      <h2>По внешнему идентификатору</h2>
      <Row>
        <Col span={24}>
          <FormField label={'Тип'}>
            <FastSearchSelect
              showSearch
              filterOption
              optionFilterProp={'name'}
              allowClear
              name={'identifierSystemId'}>
              {accountTypesOptions()}
            </FastSearchSelect>
          </FormField>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormField label={'Идентификатор'}>
            <FastInput size={'small'} name={'identifier'} />
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default OutsideIdn;
