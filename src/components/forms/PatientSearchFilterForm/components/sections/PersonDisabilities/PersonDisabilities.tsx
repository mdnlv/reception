import React from 'react';
import { Col, DatePicker, Input } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import moment from 'moment';
import { useFormikContext } from 'formik';
import FormState from '../../../types';
import { Row, Select } from 'antd';

interface SectionProps {
  invalidReasons: {
    id: number;
    name: string;
  }[];
  invalidDocs: { id: number; name: string }[];
}

const PersonDisabilities: React.FC<SectionProps> = (props) => {
  const form = useFormikContext<FormState>();

  const getInvalidDocsOptions = () => {
    return props.invalidDocs.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id}>
        {item.name}
      </Select.Option>
    ));
  };

  const getInvalidReasonsOptions = () => {
    return props.invalidReasons.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id}>
        {item.name}
      </Select.Option>
    ));
  };

  return (
    <div className={'form-section'}>
      <h2>Нетрудоспособность</h2>
      <Row gutter={16}>
        <Col span={14}>
          <FormField label={'Тип документа'}>
            <Select
              showSearch
              allowClear
              filterOption
              optionFilterProp={'name'}
              size={'small'}
              onChange={(val) => {
                form.setFieldValue('tempInvalidDocumentTypeId', val);
              }}>
              >{getInvalidDocsOptions()}
            </Select>
          </FormField>
        </Col>
        <Col span={5}>
          <FormField label={'Дата начала'}>
            <DatePicker
              size={'small'}
              value={
                form.values.tempInvalidDocumentBegDate
                  ? moment(new Date(form.values.tempInvalidDocumentBegDate))
                  : undefined
              }
              onChange={(date) => {
                form.setFieldValue(
                  'tempInvalidDocumentBegDate',
                  date ? date.toISOString() : '',
                );
              }}
            />
          </FormField>
        </Col>
        <Col span={5}>
          <FormField label={'Дата окончания'}>
            <DatePicker
              size={'small'}
              onChange={(date) => {
                form.setFieldValue(
                  'tempInvalidDocumentEndDate',
                  date ? date.toISOString() : '',
                );
              }}
              value={
                form.values.tempInvalidDocumentEndDate
                  ? moment(new Date(form.values.tempInvalidDocumentEndDate))
                  : undefined
              }
            />
          </FormField>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={3}>
          <FormField label={'Серия'}>
            <Input
              size={'small'}
              name={'tempInvalidDocumentSerial'}
              onChange={form.handleChange}
            />
          </FormField>
        </Col>
        <Col span={5}>
          <FormField label={'Номер'}>
            <Input
              size={'small'}
              name={'tempInvalidDocumentNumber'}
              onChange={form.handleChange}
            />
          </FormField>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormField
            error={form.errors.tempInvalidReasonId}
            label={'Причина нетрудоспособности'}>
            <Select
              showSearch
              filterOption
              allowClear
              optionFilterProp={'name'}
              size={'small'}
              onChange={(val) => {
                form.setFieldValue('tempInvalidReasonId', val);
              }}>
              {getInvalidReasonsOptions()}
            </Select>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PersonDisabilities;
