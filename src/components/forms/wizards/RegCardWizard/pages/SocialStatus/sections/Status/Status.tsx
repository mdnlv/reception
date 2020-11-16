import React from 'react';
import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import {Col, Divider, Row, Select} from 'antd';
import FormField from '../../../../../../components/FormField/FormField';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';

const DROPDOWN_TITLE = 'Соц.статус';

enum LABELS {
  CLASS = 'Класс',
  TYPE = 'Тип',
  START_DATE = 'Дата начала',
  END_DATE = 'Дата окончания',
  NOTE = 'Примечание',
}

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
