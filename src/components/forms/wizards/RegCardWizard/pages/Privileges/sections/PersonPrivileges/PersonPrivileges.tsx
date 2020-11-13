import React from 'react';
import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import { Col, DatePicker, Row, Select } from 'antd';
import FormField from '../../../../../../components/FormField/FormField';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';

enum LABELS {
  TYPE = 'Тип',
  START_DATE = 'Дата начала',
  END_DATE = 'Дата окончания',
  REASON = 'Причина прекращения наблюдения',
}

const PersonPrivileges: React.FC = () => {
  return (
    <div className={'form-section person-privileges'}>
      <DropDownContent title={'Льготы'}>
        <FormArrayField
          values={[]}
          name={'privileges'}
          renderChild={(key, index) => (
            <Row gutter={16} key={index}>
              <Col>
                <FormField label={LABELS.TYPE}>
                  <Select />
                </FormField>
              </Col>
              <Col>
                <FormField label={LABELS.START_DATE}>
                  <DatePicker />
                </FormField>
              </Col>
              <Col>
                <FormField label={LABELS.END_DATE}>
                  <DatePicker />
                </FormField>
              </Col>
              <Col>
                <FormField label={LABELS.REASON}>
                  <Select />
                </FormField>
              </Col>
            </Row>
          )}
        />
      </DropDownContent>
    </div>
  );
};

export default PersonPrivileges;
