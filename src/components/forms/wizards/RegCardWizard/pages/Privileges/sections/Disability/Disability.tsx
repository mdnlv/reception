import React from 'react';
import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import { Checkbox, Col, DatePicker, Input, Row, Select } from 'antd';
import FormField from '../../../../../../components/FormField/FormField';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';

const DROPDOWN_LABEL = 'Инвалидность';

enum LABELS {
  SOMAT = 'Сомат',
  SET_DATE = 'Дата установления',
  TIME = 'Бессрочно',
  GROUP = 'Группа',
  NEXT_PLAN = 'Очередное переосв.',
  WORK_PLACE = 'Место работы',
  DEGREE = 'Степень утраты трудосп.',
  ORIGIN = 'Перв.',
  HOSPITAL = 'Стационар',
  NOTE = 'Примечание',
}

const Disability: React.FC = () => {
  return (
    <div className={'form-section'}>
      <DropDownContent title={DROPDOWN_LABEL}>
        <FormArrayField
          values={[]}
          name={'invalidity'}
          renderChild={(key, index) => (
            <Row key={index} gutter={16}>
              <Col>
                <FormField label={LABELS.SOMAT}>
                  <Checkbox />
                </FormField>
              </Col>
              <Col>
                <FormField label={LABELS.SET_DATE}>
                  <DatePicker />
                </FormField>
              </Col>
              <Col>
                <FormField label={LABELS.TIME}>
                  <Checkbox />
                </FormField>
              </Col>
              <Col span={3}>
                <FormField label={LABELS.GROUP}>
                  <Select />
                </FormField>
              </Col>
              <Col>
                <FormField label={LABELS.NEXT_PLAN}>
                  <DatePicker />
                </FormField>
              </Col>
              <Col>
                <FormField label={LABELS.WORK_PLACE}>
                  <Select />
                </FormField>
              </Col>
              <Col>
                <FormField label={LABELS.DEGREE}>
                  <Select />
                </FormField>
              </Col>
              <Col>
                <FormField label={LABELS.ORIGIN}>
                  <Checkbox />
                </FormField>
              </Col>
              <Col>
                <FormField label={LABELS.HOSPITAL}>
                  <Checkbox />
                </FormField>
              </Col>
              <Col>
                <FormField label={LABELS.NOTE}>
                  <Input />
                </FormField>
              </Col>
            </Row>
          )}
        />
      </DropDownContent>
    </div>
  );
};

export default Disability;
