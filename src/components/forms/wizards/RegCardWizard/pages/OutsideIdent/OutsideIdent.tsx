import React from 'react';
import {Col, DatePicker, Row, Select} from 'antd';

import {DROPDOWN_TITLE, LABELS} from "./types";

import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import FormArrayField from '../../../../components/FormArrayField/FormArrayField';
import FormField from '../../../../components/FormField/FormField';

const OutsideIdent: React.FC = () => {
  return (
    <form className={'wizard-step outside-ident-form'}>
      <div className={'form-section'}>
        <DropDownContent title={DROPDOWN_TITLE}>
          <FormArrayField
            values={[]}
            name={'outsideIds'}
            renderChild={(key, index) => (
              <Row key={index} align={'bottom'} gutter={16}>
                <Col span={5}>
                  <FormField label={LABELS.OUTSIDE_IDENTS}>
                    <Select />
                  </FormField>
                </Col>
                <Col span={5}>
                  <FormField label={LABELS.IDENTS}>
                    <Select />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.DATE}>
                    <DatePicker />
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

export default OutsideIdent;
