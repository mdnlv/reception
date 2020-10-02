import { Button, Col, DatePicker, Input, Row, Select, Space } from 'antd';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useFormikContext } from 'formik';
import { RegistrationCardState } from '../../../../../../../../store/registrationCard/types';
import FormField from '../../../../../../components/FormField/FormField';
import optionsListMapper from '../../../../../../../../utils/mappers/optionsListMapper';

interface ListOptionItem {
  id: number;
  name: string;
}

interface SectionProps {
  policyKey: 'policyOms' | 'policyDms';
  policyTimeType: ListOptionItem[];
  policyType: ListOptionItem[];
}

const Policy: React.FC<SectionProps> = (props) => {
  const form = useFormikContext<RegistrationCardState>();

  const formValues = form.values.passportGeneral[props.policyKey];
  const sectionValuePath = `passportGeneral.${props.policyKey}`;

  const sectionTitle = () => {
    switch (props.policyKey) {
      case 'policyDms':
        return 'Полис ДМС';
      case 'policyOms':
        return 'Полис ОМС';
    }
  };

  return (
    <div
      className={`form-section policy-${
        props.policyKey === 'policyOms' ? 'omc' : 'dmc'
      }`}>
      <h2>{sectionTitle()}</h2>
      <Row className="form-row" align={'bottom'} gutter={16}>
        <Col span={5}>
          <FormField label={'С'}>
            <DatePicker
              value={formValues.from ? moment(formValues.from) : undefined}
              onChange={(date, dateString) => {
                form.setFieldValue(`${sectionValuePath}.from`, dateString);
              }}
            />
          </FormField>
        </Col>
        <Col span={5}>
          <FormField label={'До'}>
            <DatePicker
              value={formValues.to ? moment(formValues.to) : undefined}
              onChange={(date, dateString) => {
                form.setFieldValue(`${sectionValuePath}.to`, dateString);
              }}
            />{' '}
          </FormField>
        </Col>
        <Col span={4}>
          <FormField label={'Серия'}>
            <Input
              name={`${sectionValuePath}.serial`}
              value={formValues.serial}
              onChange={form.handleChange}
            />
          </FormField>
        </Col>
        <Col span={10}>
          <FormField label={'Номер'}>
            <Input
              name={`${sectionValuePath}.number`}
              value={formValues.number}
              onChange={form.handleChange}
            />
          </FormField>
        </Col>
      </Row>
      <Row className="form-row" gutter={16}>
        <Col span={14}>
          <FormField label="СМО" labelPosition="left">
            <Select />
          </FormField>
        </Col>
        <Col span={10}>
          <FormField>
            <Select
              value={formValues.type}
              onChange={(val) => {
                form.setFieldValue(`${sectionValuePath}.type`, val);
              }}>
              {optionsListMapper(props.policyType)}
            </Select>
          </FormField>
        </Col>
      </Row>
      <Row className="form-row">
        <Col span={24}>
          <FormField labelPosition="left" label="Название">
            <Input
              name={`${sectionValuePath}.name`}
              value={formValues.name}
              onChange={form.handleChange}
            />
          </FormField>
        </Col>
      </Row>
      <Row className="form-row">
        <Col span={24}>
          <FormField labelPosition="left" label="Примечание">
            <Input
              name={`${sectionValuePath}.note`}
              value={formValues.note}
              onChange={form.handleChange}
            />
          </FormField>
        </Col>
      </Row>
      <Row className="form-row" justify={'end'}>
        <Col>
          <Space>
            <Button type={'link'} danger>
              Закрыть полис
            </Button>
            <Button type={'primary'}>Добавить полис</Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Policy;
