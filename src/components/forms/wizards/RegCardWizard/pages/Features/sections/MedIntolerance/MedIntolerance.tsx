import React from 'react';
import { Col, DatePicker, Row, Select } from 'antd';

import {DROPDOWN_TITLE, LABELS} from "./types";

import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';
import FormField from '../../../../../../components/FormField/FormField';

const MedIntolerance: React.FC = () => {
  return (
    <div className={'form-section'}>
      <DropDownContent title={DROPDOWN_TITLE}>
        <FormArrayField
          values={[]}
          name={'medIntolerances'}
          renderChild={(key, index) => (
            <Row gutter={16} key={index}>
              <Col>
                <FormField label={LABELS.NAME}>
                  <Select />
                </FormField>
              </Col>
              <Col>
                <FormField label={LABELS.DEGREE}>
                  <Select />
                </FormField>
              </Col>
              <Col>
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

export default MedIntolerance;
