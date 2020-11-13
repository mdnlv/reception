import React, { FC } from 'react';
import { Col, DatePicker, Input, Row, Select } from 'antd';
import { TrustedDoc } from '../../../../../../SocialStatusForm/types';
import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';

const DROPDOWN_TITLE = 'Документ, подтверждающий соц.статус';

enum LABELS {
  SERIAL = 'Серия',
  NUMBER = 'Номер',
  DATE = 'Дата',
  GIVEN = 'Выдан',
}

const StatusDocs: FC = () => {
  return (
    <div className={'form-section social-status-doc'}>
      <DropDownContent title={DROPDOWN_TITLE}>
        <FormArrayField<TrustedDoc>
          values={[]}
          name={'docs'}
          renderChild={(key, index) => (
            <div key={index}>
              <Row gutter={16} align={'bottom'}>
                <Col span={3}>
                  <FormField>
                    <Select />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.SERIAL}>
                    <Input />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.NUMBER}>
                    <Input />
                  </FormField>
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  <FormField label={LABELS.DATE}>
                    <DatePicker />
                  </FormField>
                </Col>
                <Col span={5}>
                  <FormField label={LABELS.GIVEN}>
                    <Select />
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

export default StatusDocs;
