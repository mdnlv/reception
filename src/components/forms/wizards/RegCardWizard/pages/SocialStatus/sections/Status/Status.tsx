import React from 'react';
import {Col, Divider, Row, Select} from 'antd';

import {DROPDOWN_TITLE, LABELS} from "./types";

import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';

const Status: React.FC = () => {
  return (
    <div className={'form-section social-status'}>
      <DropDownContent title={DROPDOWN_TITLE}>
        <FormArrayField
          name={'socialStatus'}
          values={[]}
          renderChild={(status, index) => (
            <div key={index}>
              <Row gutter={16}>
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
                    <Select />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.END_DATE}>
                    <Select />
                  </FormField>
                </Col>
                <Col span={6}>
                  <FormField label={LABELS.NOTE}>
                    <Select />
                  </FormField>
                </Col>
              </Row>
              <Divider />
            </div>
          )}
        />
      </DropDownContent>
    </div>
  );
};

export default Status;
