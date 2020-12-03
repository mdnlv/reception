import React, { useCallback } from 'react';
import { Col, Row, Select } from 'antd/lib';

import FormField from '../../../../components/FormField/FormField';
import FastInputNumber from '../../../../components/fields/FastInputNumber/FastInpuNumber';
import FastSearchSelect from '../../../../components/fields/FastSearchSelect/FastSearchSelect';

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

const PreventiveMeasures: React.FC = () => {
  const selectOptions = useCallback(() => {
    return selectList.map((item) => (
      <Select.Option key={item.value} value={item.value}>
        {item.title}
      </Select.Option>
    ));
  }, []);

  return (
    <div className={'form-section'}>
      <h2>В списке профилактических мероприятий</h2>
      <Row>
        <Col span={14}>
          <FormField label={'Тип'}>
            <FastSearchSelect size={'small'} name={'clientExamPlanKindId'}>
              {selectOptions()}
            </FastSearchSelect>
          </FormField>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col>
          <FormField label={'Год'}>
            <FastInputNumber
              size={'small'}
              name={'clientExamPlanYear'}
              min={1900}>
              Год
            </FastInputNumber>
          </FormField>
        </Col>
        <Col>
          <FormField label={'Квартал'}>
            <FastInputNumber
              size={'small'}
              name={'clientExamPlanQuarter'}
              max={4}
              min={1}>
              Квартал
            </FastInputNumber>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PreventiveMeasures;
