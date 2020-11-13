import React from 'react';
import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import { Col, Input, InputNumber, Row, Select } from 'antd';
import FormField from '../../../../../../components/FormField/FormField';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';

const DROPDOWN_TITLE = 'Особенности';

enum LABELS {
  BLOOD_GROUP = 'Группа крови',
  NOTE = 'Примечание',
  DIAGNOSIS = 'Диагноз',
  WEIGHT = 'Вес при рождении',
  HEIGHT = 'Рост при рождении',
  WEEK = 'Неделя эмбрионального периода',
}

const PersonFeatures: React.FC = () => {
  return (
    <div className={'form-section'}>
      <DropDownContent title={DROPDOWN_TITLE}>
        <FormArrayField
          values={[]}
          name={'features'}
          renderChild={(key, index) => (
            <div key={index}>
              <Row>
                <Col span={4}>
                  <FormField label={LABELS.BLOOD_GROUP}>
                    <Select />
                  </FormField>
                </Col>
                <Col offset={2} span={7}>
                  <FormField label={LABELS.NOTE}>
                    <Input />
                  </FormField>
                </Col>
              </Row>
              <Row gutter={16} align={'bottom'}>
                <Col>
                  <FormField label={LABELS.DIAGNOSIS}>
                    <Input />
                  </FormField>
                </Col>
                <Col>
                  <FormField labelPosition={'left'} label={LABELS.HEIGHT}>
                    <InputNumber />
                  </FormField>
                </Col>
                <Col>
                  <FormField labelPosition={'left'} label={LABELS.WEIGHT}>
                    <InputNumber />
                  </FormField>
                </Col>
                <Col>
                  <FormField labelPosition={'left'} label={LABELS.WEEK}>
                    <InputNumber />
                  </FormField>
                </Col>
              </Row>
            </div>
          )}
        />
      </DropDownContent>
    </div>
  );
};

export default PersonFeatures;
