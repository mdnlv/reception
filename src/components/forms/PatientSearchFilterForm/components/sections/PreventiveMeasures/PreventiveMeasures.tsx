import React from 'react';
import { Col, InputNumber, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import PartialFormState from '../../../types';
import { useFormikContext } from 'formik';

const PreventiveMeasures: React.FC = (props) => {
  const form = useFormikContext<PartialFormState>();

  const selectList = [
    {
      value: 0,
      title: 'Диспансеризация',
    },
    {
      value: 1,
      title: 'Проф.осмотр',
    },
    {
      value: 2,
      title: 'Диспансерное наблюдение',
    },
  ];
  const selectOptions = () => {
    return selectList.map((item) => (
      <Select.Option key={item.value} value={item.value}>
        {item.title}
      </Select.Option>
    ));
  };

  return (
    <div className={'form-section'}>
      <h2>В списке профилактических мероприятий</h2>
      <Row>
        <Col span={14}>
          <FormField label={'Тип'}>
            <Select
              size={'small'}
              value={form.values.clientExamPlanKindId}
              onChange={(value) => {
                form.setFieldValue('clientExamPlanKindId', value);
              }}>
              {selectOptions()}
            </Select>
          </FormField>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col>
          <FormField label={'Год'}>
            <InputNumber
              size={'small'}
              name={'clientExamPlanYear'}
              min={1900}
              onChange={(val) => {
                if (val) {
                  form.setFieldValue('clientExamPlanYear', val);
                }
              }}>
              Год
            </InputNumber>
          </FormField>
        </Col>
        <Col>
          <FormField label={'Квартал'}>
            <InputNumber
              size={'small'}
              name={'clientExamPlanQuarter'}
              max={4}
              min={1}
              onChange={(val) => {
                if (val) {
                  form.setFieldValue('clientExamPlanQuarter', val);
                }
              }}>
              > Квартал
            </InputNumber>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PreventiveMeasures;
