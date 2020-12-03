import React from 'react';
import {Col, DatePicker, Input, Row, Select} from 'antd';

import {DROPDOWN_TITLE, LABELS} from "./types";

import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';

const Inspection: React.FC = () => {
  return (
    <div className={'form-section person-inspection'}>
      <DropDownContent title={DROPDOWN_TITLE}>
        <FormArrayField
          values={[]}
          name={'inspections'}
          renderChild={(key, index) => (
            <Row gutter={16} key={index}>
              <Col span={6}>
                <FormField label={LABELS.CLASS}>
                  <Select />
                </FormField>
              </Col>
              <Col span={6}>
                <FormField label={LABELS.TYPE}>
                  <Select />
                </FormField>
              </Col>
              <Col span={3}>
                <FormField label={LABELS.START_DATE}>
                  <DatePicker />
                </FormField>
              </Col>
              <Col span={3}>
                <FormField label={LABELS.END_DATE}>
                  <DatePicker />
                </FormField>
              </Col>
              <Col span={6}>
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

export default Inspection;
