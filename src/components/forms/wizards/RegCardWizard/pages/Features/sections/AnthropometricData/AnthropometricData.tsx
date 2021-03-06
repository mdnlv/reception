import React from 'react';
import { Col, DatePicker, Input, Row } from 'antd';

import {DROPDOWN_TITLE, LABELS} from "./types";

import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';

const AnthropometricData: React.FC = () => {
  return (
    <div className={'form-section'}>
      <DropDownContent title={DROPDOWN_TITLE}>
        <FormArrayField
          values={[]}
          name={'anthropometricData'}
          renderChild={(key, index) => (
            <Row gutter={16} key={index} align={'bottom'}>
              <Col span={3}>
                <FormField label={LABELS.SET_DATE}>
                  <DatePicker />
                </FormField>
              </Col>
              <Col span={2}>
                <FormField label={LABELS.HEIGHT}>
                  <Input />
                </FormField>
              </Col>
              <Col span={2}>
                <FormField label={LABELS.WEIGHT}>
                  <Input />
                </FormField>
              </Col>
              <Col span={2}>
                <FormField label={LABELS.GIRTH_CHEST}>
                  <Input />
                </FormField>
              </Col>
              <Col span={2}>
                <FormField label={LABELS.GIRTH_WAIST}>
                  <Input />
                </FormField>
              </Col>
              <Col span={2}>
                <FormField label={LABELS.BODY_MASS}>
                  <Input />
                </FormField>
              </Col>
              <Col span={2}>
                <FormField label={LABELS.PHYSIQUE}>
                  <Input />
                </FormField>
              </Col>
              <Col span={7}>
                <FormField label={LABELS.DAY_VOLUME}>
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

export default AnthropometricData;
