import React, { useCallback } from 'react';
import { Col, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import { useFormikContext } from 'formik';
import FormState from '../../../types';
import FastSearchSelect from '../../../../components/fields/FastSearchSelect/FastSearchSelect';
import FastDatePicker from '../../../../components/fields/FastDatePicker/FastDatePicker';
import FastInput from '../../../../components/fields/FastInput/FastInput';

interface InvalidArrayType {
  id: number;
  name: string;
}

interface SectionProps {
  invalidReasons: InvalidArrayType[];
  invalidDocs: InvalidArrayType[];
}

const PersonDisabilities: React.FC<SectionProps> = ({
  invalidDocs,
  invalidReasons,
}) => {
  const form = useFormikContext<FormState>();

  const getInvalidPropsOptions = useCallback((props: InvalidArrayType[]) => {
    return props.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id}>
        {item.name}
      </Select.Option>
    ));
  }, []);

  return (
    <div className={'form-section'}>
      <h2>Нетрудоспособность</h2>
      <Row gutter={16}>
        <Col span={14}>
          <FormField label={'Тип документа'}>
            <FastSearchSelect
              showSearch
              allowClear
              filterOption
              optionFilterProp={'name'}
              size={'small'}
              name={'tempInvalidDocumentTypeId'}>
              {getInvalidPropsOptions(invalidDocs)}
            </FastSearchSelect>
          </FormField>
        </Col>
        <Col span={5}>
          <FormField label={'Дата начала'}>
            <FastDatePicker
              size={'small'}
              name={'tempInvalidDocumentBegDate'}
            />
          </FormField>
        </Col>
        <Col span={5}>
          <FormField label={'Дата окончания'}>
            <FastDatePicker
              size={'small'}
              name={'tempInvalidDocumentEndDate'}
            />
          </FormField>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={3}>
          <FormField label={'Серия'}>
            <FastInput size={'small'} name={'tempInvalidDocumentSerial'} />
          </FormField>
        </Col>
        <Col span={5}>
          <FormField label={'Номер'}>
            <FastInput size={'small'} name={'tempInvalidDocumentNumber'} />
          </FormField>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormField
            error={form.errors.tempInvalidReasonId}
            label={'Причина нетрудоспособности'}>
            <FastSearchSelect
              showSearch
              filterOption
              allowClear
              optionFilterProp={'name'}
              size={'small'}
              name={'tempInvalidReasonId'}>
              {getInvalidPropsOptions(invalidReasons)}
            </FastSearchSelect>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PersonDisabilities;
