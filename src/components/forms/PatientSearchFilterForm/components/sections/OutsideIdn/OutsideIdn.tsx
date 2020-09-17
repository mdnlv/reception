import React from 'react';
import { Col, Input, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import { useFormikContext } from 'formik';
import PartialFormState from '../../../types';

interface SectionProps {
  accountTypes: { id: number; name: string }[];
}

const OutsideIdn: React.FC<SectionProps> = (props) => {
  const form = useFormikContext<PartialFormState>();

  const accountTypesOptions = props.accountTypes.map((item) => (
    <Select.Option key={item.id} name={item.name} value={item.id}>
      {item.name}
    </Select.Option>
  ));

  return (
    <div className={'form-section'}>
      <h2>По внешнему идентификатору</h2>
      <Row>
        <Col span={24}>
          <FormField label={'Тип'}>
            <Select
              showSearch
              filterOption
              optionFilterProp={'name'}
              allowClear
              value={form.values.identifierSystemId}
              onChange={(val) => {
                form.setFieldValue('identifierSystemId', val);
              }}
              size={'small'}>
              {accountTypesOptions}
            </Select>
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
