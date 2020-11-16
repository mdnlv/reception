import React from 'react';
import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import FormArrayField from '../../../../components/FormArrayField/FormArrayField';
import {Col, DatePicker, Input, Row, Select} from 'antd';
import FormField from '../../../../components/FormField/FormField';

const DROPDOWN_TITLE = 'Госпитализация в другие ЛПУ';

enum LABELS {
  NUMBER = '№ п/п',
  LPU = 'Наименование ЛПУ',
  AIM = 'Цель госпитализации',
  DATE = 'Дата поступления',
  END_DATE = 'Дата выбытия',
  MKB = 'МКБ',
  DIAGNOSIS = 'Клинический диагноз',
}

const OutsideHospitalization: React.FC = () => {
  return (
    <form className={'outside-hospitalization-form'}>
      <div className={'form-section'}>
        <DropDownContent title={DROPDOWN_TITLE}>
          <FormArrayField
            values={[]}
            name={'outsideHospitalization'}
            renderChild={(key, index) => (
              <Row key={index} gutter={16}>
                <Col>
                  <FormField label={LABELS.NUMBER}>
                    <Select />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={LABELS.LPU}>
                    <Select />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={LABELS.AIM}>
                    <Select />
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
                  <FormField label={LABELS.MKB}>
                    <Input />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={LABELS.DIAGNOSIS}>
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

export default OutsideHospitalization;
