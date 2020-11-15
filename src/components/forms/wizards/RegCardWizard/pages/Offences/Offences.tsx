import React from 'react';
import { Col, DatePicker, Input, Row } from 'antd';

import {DROPDOWN_TITLE, LABELS} from "./types";

import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../components/FormField/FormField';
import FormArrayField from '../../../../components/FormArrayField/FormArrayField';

const Offences: React.FC = () => {
  return (
    <form className={'wizard-step offences-form'}>
      <div className={'form-section'}>
        <DropDownContent title={DROPDOWN_TITLE}>
          <FormArrayField
            name={'offences'}
            values={[]}
            renderChild={(key, index) => (
              <Row gutter={16} key={index} align={'bottom'}>
                <Col span={2}>
                  <FormField label={LABELS.ARTICLE}>
                    <Input />
                  </FormField>
                </Col>
                <Col span={2}>
                  <FormField label={LABELS.COURT}>
                    <Input />
                  </FormField>
                </Col>
                <Col span={2}>
                  <FormField label={LABELS.NUMBER}>
                    <Input />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.DATE}>
                    <DatePicker />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.DECREE}>
                    <Input />
                  </FormField>
                </Col>
                <Col span={4}>
                  <FormField label={LABELS.DOCTOR}>
                    <Input />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.NEXT_COURT}>
                    <DatePicker />
                  </FormField>
                </Col>
                <Col span={5}>
                  <FormField label={LABELS.NOTE}>
                    <Input />
                  </FormField>
                </Col>
              </Row>
            )}
          />
        </DropDownContent>
      </div>
    </form>
  );
};

export default Offences;
