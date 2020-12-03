import React from 'react';
import { Col, DatePicker, Row, Select } from 'antd';

import {ALLERGY_TITLE, LABELS} from "./types";

import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';

const Allergy: React.FC = () => {
  return (
    <div className={'form-section person-allergy'}>
      <DropDownContent title={ALLERGY_TITLE}>
        <FormArrayField
          values={[]}
          name={'allergy'}
          renderChild={(key, index) => (
            <Row key={index} gutter={16}>
              <Col span={5}>
                <FormField label={LABELS.NAME}>
                  <Select />
                </FormField>
              </Col>
              <Col span={5}>
                <FormField label={LABELS.DEGREE}>
                  <Select />
                </FormField>
              </Col>
              <Col span={5}>
                <FormField label={LABELS.SET_DATE}>
                  <DatePicker />
                </FormField>
              </Col>
            </Row>
          )}
        />
      </DropDownContent>
    </div>
  );
};

export default Allergy;
