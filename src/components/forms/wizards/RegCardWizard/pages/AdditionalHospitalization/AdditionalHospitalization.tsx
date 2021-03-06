import React from 'react';
import { Col, DatePicker, Input, Row } from 'antd';

import {DROPDOWN_TITLE, LABELS} from "./types";

import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../components/FormField/FormField';
import FormArrayField from '../../../../components/FormArrayField/FormArrayField';

const AdditionalHospitalization: React.FC = () => {
  return (
    <form className={'wizard-step additional-hospitalization-form'}>
      <div className={'form-section'}>
        <DropDownContent title={DROPDOWN_TITLE}>
          <FormArrayField
            values={[]}
            name={'hospitalizations'}
            renderChild={(key, index) => (
              <Row key={index} gutter={16}>
                <Col>
                  <FormField label={LABELS.CODE}>
                    <Input />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={LABELS.DATE}>
                    <DatePicker />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={LABELS.END_DATE}>
                    <DatePicker />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={LABELS.CODE_MO}>
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

export default AdditionalHospitalization;
