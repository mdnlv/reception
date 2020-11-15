import React from 'react';
import { Col, Input, Row, Select } from 'antd';

import {LABELS} from "./types";

import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';

const Employment: React.FC = () => {
  return (
    <div className={'form-section'}>
      <DropDownContent title={LABELS.EMPLOYMENT}>
        <FormArrayField
          values={[]}
          name={'employment'}
          renderChild={(key, index) => (
            <div key={index}>
              <Row gutter={16}>
                <Col span={8} className={'col--border-right'}>
                  <FormField label={LABELS.ORG}>
                    <Select />
                  </FormField>
                </Col>
                <Col span={8} className={'col--border-right'}>
                  <FormField label={LABELS.POSITION}>
                    <Input />
                  </FormField>
                  <FormField label={LABELS.EXPERIENCE}>
                    <Input />
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField label={LABELS.INN}>
                    <Input />
                  </FormField>
                  <FormField label={LABELS.OGRN}>
                    <Input />
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

export default Employment;
