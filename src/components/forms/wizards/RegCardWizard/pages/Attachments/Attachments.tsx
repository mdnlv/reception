import React from 'react';
import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import FormArrayField from '../../../../components/FormArrayField/FormArrayField';
import { Col, DatePicker, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';

const DROPDOWN_TITLE = 'Прикрепление';

enum LABELS {
  TYPE = 'Тип',
  LPU = 'ЛПУ',
  UNIT = 'Подразделение',
  ATTACHMENT_DATE = 'Дата прикрепления',
  DETACH_DATE = 'Дата открепления',
  DETACH_REASON = 'Причина открепления',
}

const Attachments: React.FC = () => {
  return (
    <form className={'wizard-step attachments-form'}>
      <div className="form-section">
        <DropDownContent title={DROPDOWN_TITLE}>
          <FormArrayField
            values={[]}
            name={'attachments'}
            renderChild={(key, index) => (
              <Row gutter={16} key={index}>
                <Col span={3}>
                  <FormField label={LABELS.TYPE}>
                    <Select />
                  </FormField>
                </Col>
                <Col span={6}>
                  <FormField label={LABELS.LPU}>
                    <Select />
                  </FormField>
                </Col>
                <Col span={4}>
                  <FormField label={LABELS.UNIT}>
                    <Select />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.ATTACHMENT_DATE}>
                    <DatePicker />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.DETACH_DATE}>
                    <DatePicker />
                  </FormField>
                </Col>
                <Col span={5}>
                  <FormField label={LABELS.DETACH_REASON}>
                    <Select />
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

export default Attachments;
