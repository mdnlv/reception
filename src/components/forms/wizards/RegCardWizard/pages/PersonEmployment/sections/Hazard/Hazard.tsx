import React from 'react';
import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import { Col, Divider, Input, Row, Select } from 'antd';
import FormField from '../../../../../../components/FormField/FormField';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';

const DROPDOWN_TITLE = 'Вредность';

enum LABELS {
  HAZARD = 'Вредность',
  EXPERIENCE = 'Опыт',
  FACTOR = 'Фактор',
  ORG = 'Организация',
  POSITION = 'Должность',
}

const Hazard: React.FC = (props) => {
  return (
    <div className={'form-section person-hazard'}>
      <DropDownContent title={DROPDOWN_TITLE}>
        <FormArrayField
          values={[]}
          name={'hazardHistory'}
          renderChild={(hazard, index) => (
            <Row gutter={16} key={index}>
              <Col span={16}>
                <FormField label={LABELS.HAZARD}>
                  <Select />
                </FormField>
              </Col>
              <Col span={4}>
                <FormField label={LABELS.EXPERIENCE}>
                  <Input />
                </FormField>
              </Col>
            </Row>
          )}
        />
        <Divider />
        <Row>
          <Col span={12}>
            <FormField label={LABELS.FACTOR}>
              <Select />
            </FormField>
          </Col>
        </Row>
        <Divider />
        <Row gutter={16} align={'bottom'}>
          <Col span={8}>
            <FormField label={LABELS.ORG}>
              <Select />
            </FormField>
          </Col>
          <Col span={8}>
            <FormField label={LABELS.POSITION}>
              <Select />
            </FormField>
          </Col>
          <Col>
            <FormField label={LABELS.EXPERIENCE}>
              <Input />
            </FormField>
          </Col>
        </Row>
      </DropDownContent>
    </div>
  );
};

export default Hazard;
